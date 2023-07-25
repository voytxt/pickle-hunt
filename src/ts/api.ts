import wretch from 'wretch';
import { reference as referenceStore } from './stores';

// these game names can be fetched from https://api.hypixel.net/resources/games,
// but that (1) doesn't include seasonal names,
// and (2) blitz, cops and crims, and warlords have a different name for some reason
// so it's probably better to hardcode it for now
// original code: https://github.com/vojta-dev/pickle-hunt/blob/117f1a3949b66629ff94aa8d5cab413fab0a311d/src/main.ts#L14-L31
export const gameNames: Record<string, string> = {
  arcade: 'Arcade',
  arena: 'Arena Brawl',
  battleground: 'Warlords',
  bedwars: 'Bed Wars',
  blitz: 'Blitz',
  buildbattle: 'Build Battle',
  christmas2017: 'Christmas',
  copsandcrims: 'Cops and Crims',
  duels: 'Duels',
  easter: 'Easter',
  general: 'General',
  gingerbread: 'Turbo Kart Racers',
  halloween2017: 'Halloween',
  housing: 'Housing',
  hungergames: 'Blitz Survival Games',
  legacy: 'Classic Games',
  mcgo: 'Cops and Crims',
  murdermystery: 'Murder Mystery',
  paintball: 'Paintball',
  pit: 'Pit',
  prototype: 'Prototype',
  quake: 'Quakecraft',
  skyblock: 'SkyBlock',
  skyclash: 'SkyClash',
  skywars: 'SkyWars',
  smp: 'SMP',
  speeduhc: 'Speed UHC',
  summer: 'Summer',
  supersmash: 'Smash Heroes',
  tntgames: 'The TNT Games',
  truecombat: 'Crazy Walls',
  uhc: 'UHC Champions',
  vampirez: 'VampireZ',
  walls: 'Walls',
  walls3: 'Mega Walls',
  warlords: 'Warlords',
  woolgames: 'Wool Wars',
};

export async function fetchReference() {
  const response: {
    success?: true;
    achievements?: Record<
      string,
      {
        one_time: Record<
          string,
          { name: string; description: string; points: number } & ({ legacy: true } | { globalPercentUnlocked: number })
        >;
        tiered: Record<
          string,
          {
            name: string;
            description: string;
            tiers: { tier: number; points: number; amount: number }[];
          }
        >;
      }
    >;
  } = await wretch().get('https://api.hypixel.net/resources/achievements').json();

  if (response.success && response.achievements) {
    const reference: Reference = {};

    for (const [gameId, achievements] of Object.entries(response.achievements)) {
      const gameName = gameNames[gameId];

      reference[gameName] = { gameId, oneTime: {}, tiered: {} };

      for (const [id, ach] of Object.entries(achievements.one_time)) {
        const isLegacy = 'legacy' in ach;

        reference[gameName].oneTime[id.toLowerCase()] = {
          name: ach.name,
          description: ach.description,
          reward: ach.points,
          isLegacy,
          ...(isLegacy ? {} : { percentage: ach.globalPercentUnlocked }),
        } as OneTimeAchievementReference;
      }

      for (const [id, ach] of Object.entries(achievements.tiered)) {
        reference[gameName].tiered[id.toLowerCase()] = {
          name: ach.name,
          description: ach.description,
          reward: ach.tiers.reduce((sum, tier) => sum + tier.points, 0),
          tiers: ach.tiers.map((tier) => ({
            requirement: tier.amount,
            reward: tier.points,
          })),
        };
      }
    }

    referenceStore.set(reference);
    return reference;
  } else {
    referenceStore.set({});
    return {};
  }
}
