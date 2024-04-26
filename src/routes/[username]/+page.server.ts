import { HYPIXEL_API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import wretch from 'wretch';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  const startTime = new Date().getTime();

  console.log('>', params.username);

  let uuid = params.username;

  // oops, that's not a uuid, that's a username
  if (params.username.length < 17) {
    uuid = await getUuid(params.username);

    console.log('Got uuid:', uuid);
  }

  const stats = await getStats(uuid);

  console.log('Got stats:', stats.achievementPoints, 'APs');

  console.log('< [200] took', new Date().getTime() - startTime, 'ms');

  return { uuid, ...stats };
}) satisfies PageServerLoad;

// https://wiki.vg/Mojang_API#Username_to_UUID
async function getUuid(username: string): Promise<string> {
  const response: { id?: string } = await wretch()
    .get(`https://api.mojang.com/users/profiles/minecraft/${username}`)
    .badRequest((err) => {
      console.error(`< [400] ${err.json.error}: ${err.json.errorMessage}`);
      throw error(400, err.json.errorMessage);
    })
    .notFound((err) => {
      console.error(`< [404] ${err.json.errorMessage}`);
      throw error(404, err.json.errorMessage);
    })
    .json();

  if (response.id === undefined) {
    console.error(`< [500] ${JSON.stringify(response)}`);
    throw error(500, JSON.stringify(response));
  }

  return response.id;
}

// https://api.hypixel.net/#tag/Player-Data/paths/~1player/get
async function getStats(uuid: string): Promise<{
  username: string;
  achievementPoints: number;
  oneTime: string[];
  tiered: Record<string, number>;
}> {
  const response: {
    success?: true;
    player?: {
      displayname: string;
      achievementPoints: number;
      achievementsOneTime: string[];
      achievements: Record<string, number>;
    };
  } = await wretch()
    .get(`https://api.hypixel.net/player?key=${HYPIXEL_API_KEY}&uuid=${uuid}`)
    .badRequest((err) => {
      console.error(`< [400] ${err.json.cause}`);
      throw error(400, err.json.cause);
    })
    .forbidden((err) => {
      console.error(`< [403] ${err.json.cause}`);
      throw error(403, err.json.cause);
    })
    .error(429, (err) => {
      console.error(`< [429] ${err.json.cause}`);
      throw error(429, err.json.cause);
    })
    .json();

  // if a player is level 0, { success: true, player: null } can happen - this is undocumented behavior
  // if a player joined before APs were a thing, achievementPoints can be undefined (936555d35b624d74a6b952db395756c1, notch)
  if (!response.success || response.player == null || response.player.achievementPoints === undefined) {
    console.error(`< [500] ${JSON.stringify(response)}`);
    throw error(500, JSON.stringify(response));
  }

  return {
    // the username that hypixel returns is properly capitalized, so we grab it
    // for example: xxandrewtatexx -> XXAndrewTateXX
    username: response.player.displayname,

    achievementPoints: response.player.achievementPoints,
    oneTime: response.player.achievementsOneTime,
    tiered: response.player.achievements,
  };
}
