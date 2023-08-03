<script lang="ts">
  import { gameNames } from './api';
  import { filter, search, selectedTab, sort, stats } from './stores';

  let game: Game | null = null;

  $: {
    if ($stats !== null && $selectedTab !== 'profile') {
      game = structuredClone($stats[gameNames[$selectedTab]]);
      game = searchAndFilterAchs(game, $search, $filter);
      game = sortAchs(game, $sort);
    }
  }

  function searchAndFilterAchs(game: Game, search: string, filter: Filter): Game {
    let searchString = search.toLowerCase();
    const searchIncludes = (str: string) => str.toLowerCase().includes(searchString);

    let filterCompleted = filter === 'completed';
    const filterIncludes = (completed: boolean) => filterCompleted === completed || filter === 'all';

    game.oneTime = Object.fromEntries(
      Object.entries(game.oneTime).filter(([, ach]) => {
        return filterIncludes(ach.completed) && (searchIncludes(ach.name) || searchIncludes(ach.description));
      })
    );

    game.tiered = Object.fromEntries(
      Object.entries(game.tiered).filter(([, ach]) => {
        return (
          filterIncludes(ach.completedReward === ach.reward) &&
          (searchIncludes(ach.name) || searchIncludes(ach.description))
        );
      })
    );

    return game;
  }

  function sortAchs(game: Game, sort: Sort): Game {
    const multiplier = sort.direction === 'ascending' ? 1 : -1;

    if (sort.criteria === 'name') {
      game.oneTime = Object.fromEntries(
        Object.entries(game.oneTime).sort(([, a], [, b]) => {
          if (a.name > b.name) return 1 * multiplier;
          if (a.name < b.name) return -1 * multiplier;

          return 0;
        })
      );

      game.tiered = Object.fromEntries(
        Object.entries(game.tiered).sort(([, a], [, b]) => {
          if (a.name > b.name) return 1 * multiplier;
          if (a.name < b.name) return -1 * multiplier;

          return 0;
        })
      );
    } else if (sort.criteria === 'reward') {
      game.oneTime = Object.fromEntries(
        Object.entries(game.oneTime).sort(([, a], [, b]) => {
          if (a.reward > b.reward) return 1 * multiplier;
          if (a.reward < b.reward) return -1 * multiplier;

          return 0;
        })
      );

      game.tiered = Object.fromEntries(
        Object.entries(game.tiered).sort(([, a], [, b]) => {
          if (a.reward > b.reward) return 1 * multiplier;
          if (a.reward < b.reward) return -1 * multiplier;

          return 0;
        })
      );
    } else if (sort.criteria === 'unlocked') {
      game.oneTime = Object.fromEntries(
        Object.entries(game.oneTime).sort(([, a], [, b]) => {
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

    return game;
  }

  function formatNumber(num: number): string {
    return num.toLocaleString('en', { notation: 'compact' });
  }

  function formatPercentage(percentage: number): string {
    if (percentage >= 10) return Math.round(percentage).toString();
    if (percentage >= 1) return (Math.round(percentage * 10) / 10).toString();

    return percentage.toPrecision(1);
  }
</script>

{#if game !== null}
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
            {#each Object.values(game.tiered) as ach}
              <tr class:completed={ach.completedReward === ach.reward}>
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
            {#each Object.values(game.oneTime) as ach}
              <tr class:completed={ach.completed}>
                <td>{ach.name}</td>
                <td>{ach.description}</td>
                <td class="table-cell-fit pr-8 text-right">{ach.reward} APs</td>
                <td class="table-cell-fit pr-8 text-right">
                  {'percentage' in ach ? formatPercentage(ach.percentage) + '%' : 'legacy'}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
{/if}

<style lang="postcss">
  table tr td {
    @apply px-4 text-base;
  }

  tr.completed {
    @apply bg-success-300 text-success-900 dark:bg-success-600/70 dark:text-white;
  }
</style>
