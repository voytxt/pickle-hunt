<script lang="ts">
  import { beforeUpdate } from 'svelte';
  import { filter, search, sort } from '../ts/stores';

  export let achievements: {
    oneTime: Record<string, OneTimeAchievement>;
    tiered: Record<string, TieredAchievement>;
  };

  sort.subscribe((s) => sortAchs(s));
  beforeUpdate(() => sortAchs($sort));

  function formatPercentage(percentage: number): string {
    if (percentage >= 10) return Math.round(percentage).toString();
    if (percentage >= 1) return (Math.round(percentage * 10) / 10).toString();

    return percentage.toPrecision(1);
  }

  function formatNumber(num: number): string {
    return num.toLocaleString('en', { notation: 'compact' });
  }

  function sortAchs(s: Sort) {
    const multiplier = s.direction === 'ascending' ? 1 : -1;

    if (s.criteria === 'name') {
      achievements.oneTime = Object.fromEntries(
        Object.entries(achievements.oneTime).sort(([, a], [, b]) => {
          if (a.name > b.name) return 1 * multiplier;
          if (a.name < b.name) return -1 * multiplier;

          return 0;
        })
      );

      achievements.tiered = Object.fromEntries(
        Object.entries(achievements.tiered).sort(([, a], [, b]) => {
          if (a.name > b.name) return 1 * multiplier;
          if (a.name < b.name) return -1 * multiplier;

          return 0;
        })
      );
    } else if (s.criteria === 'reward') {
      achievements.oneTime = Object.fromEntries(
        Object.entries(achievements.oneTime).sort(([, a], [, b]) => {
          if (a.reward > b.reward) return 1 * multiplier;
          if (a.reward < b.reward) return -1 * multiplier;

          return 0;
        })
      );

      achievements.tiered = Object.fromEntries(
        Object.entries(achievements.tiered).sort(([, a], [, b]) => {
          if (a.reward > b.reward) return 1 * multiplier;
          if (a.reward < b.reward) return -1 * multiplier;

          return 0;
        })
      );
    } else if (s.criteria === 'unlocked') {
      achievements.oneTime = Object.fromEntries(
        Object.entries(achievements.oneTime).sort(([, a], [, b]) => {
          if ('legacy' in a) return 1;
          if ('legacy' in b) return -1;

          if ('percentage' in a && 'percentage' in b) {
            if (a.percentage > b.percentage) return 1 * multiplier;
            if (a.percentage < b.percentage) return -1 * multiplier;
          }

          return 0;
        })
      );
    }

    achievements = achievements;
  }

  function searchAchs<A extends { name: string; description: string }>(achs: Array<A>): Array<A> {
    return achs.filter(
      (ach) =>
        ach.name.toLowerCase().includes($search.toLowerCase()) ||
        ach.description.toLowerCase().includes($search.toLowerCase())
    );
  }
</script>

<div class="box relative mr-2 h-[calc(100%-1rem)] lg:mr-4 lg:h-[calc(100%-2rem)]">
  <div class="absolute inset-2 right-0 space-y-4 overflow-auto lg:inset-4 lg:right-2 lg:pr-2">
    <div class="table-container">
      <table class="table table-compact">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th class="table-cell-fit text-center">Tiers</th>
            <th class="table-cell-fit text-center">Reward</th>
          </tr>
        </thead>
        <tbody>
          {#each searchAchs(Object.values(achievements.tiered)) as ach}
            {@const completed = ach.completedReward === ach.reward}

            {#if $filter === 'all' || ($filter === 'completed' && completed) || ($filter === 'uncompleted' && !completed)}
              <tr class:completed>
                <td>{ach.name}</td>
                <td>
                  {@html ach.description.replace(
                    '%s',
                    `<span class="hover:cursor-help hover:underline" title="${ach.tiers
                      .map((t) => formatNumber(t.requirement))
                      .join(', ')}">
                    [${formatNumber(ach.amount)} / ${formatNumber(
                      ach.tiers[ach.completedTiers]?.requirement ?? ach.tiers[ach.tiers.length - 1].requirement
                    )}]</span>`
                  )}
                </td>
                <td class="table-cell-fit text-right">
                  {ach.completedTiers}&nbsp;/&nbsp;{ach.tiers.length}
                </td>
                <td class="table-cell-fit pr-8 text-right">
                  {ach.completedReward}&nbsp;/&nbsp;{ach.reward}&nbsp;APs
                </td>
              </tr>
            {/if}
          {/each}
        </tbody>
      </table>
    </div>
    <div class="table-container">
      <table class="table table-compact">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th class="table-cell-fit text-center">Reward</th>
            <th class="table-cell-fit text-center">Unlocked</th>
          </tr>
        </thead>
        <tbody>
          {#each searchAchs(Object.values(achievements.oneTime)) as ach}
            {#if $filter === 'all' || ($filter === 'completed' && ach.completed) || ($filter === 'uncompleted' && !ach.completed)}
              <tr class:completed={ach.completed}>
                <td>{ach.name}</td>
                <td>{ach.description}</td>
                <td class="table-cell-fit pr-8 text-right">{ach.reward} APs</td>
                <td class="table-cell-fit pr-8 text-right">
                  {'percentage' in ach ? formatPercentage(ach.percentage) + '%' : 'legacy'}
                </td>
              </tr>
            {/if}
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<style lang="postcss">
  table tr td {
    padding: 0 1rem;
    @apply text-base;
  }

  tr.completed {
    @apply bg-success-300 text-success-900 dark:bg-success-600/70 dark:text-white;
  }
</style>
