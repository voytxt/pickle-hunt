import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';
import wretch from 'wretch';

export const achievements: Writable<Record<string, Game> | null> = localStorageStore('achievements', null);
export const gameNames: Writable<Record<string, string> | null> = localStorageStore('gameNames', null);

const api = wretch('https://api.hypixel.net').resolve((response) => response.json());

export async function getAchievements(): Promise<Record<string, Game>> {
  const response = (await api.get('/resources/achievements')) as APIAchievementsResponse;

  if (response.success) {
    const achievements: Record<string, Game> = {};

    for (const game of Object.keys(response.achievements).sort()) {
      achievements[game] = response.achievements[game];
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
      achievements: Record<string, Game>;
    }
  | {
      success: false;
      error: string;
    };

type APIGamesResponse =
  | { success: true; games: Record<string, { name: string; databaseName: string }> }
  | { success: false };

type Game = {
  one_time: Record<string, OneTimeAchievement>;
  tiered: Record<string, TieredAchievement>;
};

type OneTimeAchievement = {
  name: string;
  description: string;
  points: number;
  // gamePercentUnlocked: number;
  globalPercentUnlocked: number;
};

type TieredAchievement = {
  name: string;
  description: string;
  tiers: { tier: number; points: number; amount: number };
};
