type Reference = Record<
  string,
  {
    gameId: stirng;
    oneTime: Record<string, OneTimeAchievementReference>;
    tiered: Record<string, TieredAchievementReference>;
  }
>;

type OneTimeAchievementReference = {
  name: string;
  description: string;
  reward: number;
} & ({ isLegacy: true } | { isLegacy: false; percentage: number });

type TieredAchievementReference = {
  name: string;
  description: string;
  reward: number;
  tiers: { requirement: number; reward: number }[];
};

type Stats = Record<
  string,
  {
    gameId: string;
    oneTime: Record<string, OneTimeAchievement>;
    tiered: Record<string, TieredAchievement>;
  }
>;

type OneTimeAchievement = OneTimeAchievementReference & {
  completed: boolean;
};

type TieredAchievement = TieredAchievementReference & {
  amount: number;
  completedTiers: number;
  completedReward: number;
};

type Filter = 'all' | 'completed' | 'uncompleted';

type Sort = {
  criteria: 'name' | 'reward' | 'unlocked';
  direction: 'ascending' | 'descending';
};
