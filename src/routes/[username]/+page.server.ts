import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  return {
    username: params.username,
    achievementPoints: 123,
  };
}) satisfies PageServerLoad;

// async function getStats() {
//   const apiKey = '';

//   const response: APIStatsResponse = await wretch('https://api.hypixel.net/player')
//     .get(`?key=${apiKey}&uuid=c7b157b5-188f-4292-9f8e-2e55c339d6bd`)
//     .json();
//   if (response.success) {
//     return response.player;
//   } else {
//     return {};
//   }
// }

// type APIStatsResponse = {
//   success: boolean;
//   player: Stats | undefined;
//   cause: string | undefined;
// };

// type Stats = {
//   achievementPoints: number;
//   achievementsOneTime: string[];
// };
