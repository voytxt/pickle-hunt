import { localStorageStore } from '@skeletonlabs/skeleton';
import { writable, type Writable } from 'svelte/store';
import wretch from 'wretch';

export const achievements: Writable<Record<string, Game> | null> = localStorageStore('achievements', null);
export const gameNames: Writable<Record<string, string> | null> = localStorageStore('gameNames', null);
export const selectedTab: Writable<string> = writable('profile');

export const api = wretch('https://api.hypixel.net').resolve((response) => response.json());

export async function getAchievements(): Promise<Record<string, Game>> {
  const response = (await api.get('/resources/achievements')) as APIAchievementsResponse;

  if (response.success) {
    const achievements: Record<string, Game> = {};

    for (const game of Object.keys(response.achievements).sort()) {
      achievements[game] = {
        oneTime: response.achievements[game].one_time,
        tiered: response.achievements[game].tiered,
      };
    }

    return achievements;
  } else {
    return {};
  }
}

export async function getGameNames(): Promise<Record<string, string>> {
  const response = (await api.get('/resources/games')) as APIGamesResponse;

  if (response.success) {
    const gameNames: Record<string, string> = {
      general: 'General',

      blitz: 'Blitz',
      copsandcrims: 'Cops and Crims',
      warlords: 'Warlords',

      easter: 'Easter',
      summer: 'Summer',
      halloween2017: 'Halloween',
      christmas2017: 'Christmas',
    };

    for (const game of Object.values(response.games)) {
      gameNames[game.databaseName.toLowerCase()] = game.name;
    }

    return gameNames;
  } else {
    return {};
  }
}

type APIAchievementsResponse =
  | {
      success: true;
      achievements: Record<
        string,
        {
          one_time: Record<string, OneTimeAchievement>;
          tiered: Record<string, TieredAchievement>;
        }
      >;
    }
  | {
      success: false;
      error: string;
    };

type APIGamesResponse =
  | { success: true; games: Record<string, { name: string; databaseName: string }> }
  | { success: false };

export type Game = {
  oneTime: Record<string, OneTimeAchievement>;
  tiered: Record<string, TieredAchievement>;
};

export type OneTimeAchievement =
  | {
      legacy: true;
      name: string;
      description: string;
      points: number;
    }
  | {
      name: string;
      description: string;
      points: number;
      globalPercentUnlocked: number;
    };

export type TieredAchievement = {
  name: string;
  description: string;
  tiers: { tier: number; points: number; amount: number }[];
};

export type GameAchs = Record<string, Achs>;

export type Achs = {
  oneTime: Record<
    string,
    | {
        legacy: true;
        name: string;
        description: string;
        points: number;
        completed: boolean;
      }
    | {
        name: string;
        description: string;
        points: number;
        completed: boolean;
        globalPercentUnlocked: number;
      }
  >;
  tiered: Record<
    string,
    {
      name: string;
      description: string;
      tiers: { tier: number; points: number; amount: number }[];
      completed: number;
      points: number;
      amount: number;
    }
  >;
};
