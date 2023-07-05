import { HYPIXEL_API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import wretch from 'wretch';
import { api } from '../../main';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  console.log('Fetching stats for', params.username);

  const uuid = await getUuid(params.username);
  const stats = await getStats(uuid);

  return {
    username: params.username,
    ...stats,
  };
}) satisfies PageServerLoad;

async function getUuid(username: string): Promise<string> {
  const response = (await wretch()
    .get(`https://api.mojang.com/users/profiles/minecraft/${username}`)
    .json()) as APIUuidResponse;

  return response.id;
}

async function getStats(uuid: string): Promise<Stats> {
  const response = (await api.get(`/player?key=${HYPIXEL_API_KEY}&uuid=${uuid}`)) as APIStatsResponse;

  if (!response.success) {
    throw error(500, response.cause);
  }

  return response.player;
}

type APIUuidResponse = {
  id: string;
};

type APIStatsResponse =
  | {
      success: true;
      player: Stats;
    }
  | {
      success: false;
      cause: string;
    };

type Stats = {
  achievementPoints: number;
  achievementsOneTime: string[];
};
