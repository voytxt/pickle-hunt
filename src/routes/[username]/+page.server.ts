import { HYPIXEL_API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import wretch from 'wretch';
import { api } from '../../main';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  console.log('[1/3] Fetching uuid for', params.username);

  const uuid = await getUuid(params.username);

  console.log('[2/3] Fetching stats for', uuid);

  const stats = await getStats(uuid);

  console.log('[3/3] Success!', stats.achievementPoints, 'APs\n');

  return {
    username: params.username,
    uuid,
    ...stats,
  };
}) satisfies PageServerLoad;

async function getUuid(username: string): Promise<string> {
  try {
    const response = (await wretch()
      .get(`https://api.mojang.com/users/profiles/minecraft/${username}`)
      .json()) as APIUuidResponse;

    return response.id;
  } catch (err) {
    if (err instanceof Error) {
      const cause = JSON.parse(err.message).errorMessage;

      console.error('ERROR:', cause, '\n');
      throw error(500, `[Mojang] ${cause}`);
    } else {
      console.error('ERROR:', err, '\n');
      throw error(500, `[Mojang] Unknown error`);
    }
  }
}

async function getStats(uuid: string): Promise<Stats> {
  try {
    const response = (await api.get(`/player?key=${HYPIXEL_API_KEY}&uuid=${uuid}`)) as APIStatsResponse;
    return response.player;
  } catch (err) {
    if (err instanceof Error) {
      const cause = JSON.parse(err.message).cause;

      console.error('ERROR:', cause, '\n');
      throw error(500, `[Hypixel] ${cause}`);
    } else {
      console.error('ERROR:', err, '\n');
      throw error(500, `[Hypixel] Unknown error`);
    }
  }
}

type APIUuidResponse = {
  id: string;
};

type APIStatsResponse = {
  success: true;
  player: Stats;
};
// | {
//     success: false;
//     cause: string;
//   };

type Stats = {
  achievementPoints: number;
  achievementsOneTime: string[];
  achievements: Record<string, number>;
};
