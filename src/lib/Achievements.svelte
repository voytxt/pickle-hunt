<script lang="ts">
  import { beforeUpdate } from 'svelte';
  import { filter, search, sort, type Achs, type Sort } from '../main';

  export let achs: Achs;

  sort.subscribe((s) => sortAchs(s));
  beforeUpdate(() => sortAchs($sort));

  function formatPercentage(percentage: number): string {
    if (percentage >= 10) return Math.round(percentage).toString();
    if (percentage >= 1) return (Math.round(percentage * 10) / 10).toString();

    return percentage.toPrecision(1);
  }

  function sortAchs(s: Sort) {
    const multiplier = s.direction === 'ascending' ? 1 : -1;

    if (s.criteria === 'name') {
      achs.oneTime = Object.fromEntries(
        Object.entries(achs.oneTime).sort(([, a], [, b]) => {
          if (a.name > b.name) return 1 * multiplier;
          if (a.name < b.name) return -1 * multiplier;

          return 0;
        })
      );

      achs.tiered = Object.fromEntries(
        Object.entries(achs.tiered).sort(([, a], [, b]) => {
          if (a.name > b.name) return 1 * multiplier;
          if (a.name < b.name) return -1 * multiplier;

          return 0;
        })
      );
    } else if (s.criteria === 'reward') {
      achs.oneTime = Object.fromEntries(
        Object.entries(achs.oneTime).sort(([, a], [, b]) => {
          if (a.points > b.points) return 1 * multiplier;
          if (a.points < b.points) return -1 * multiplier;

          return 0;
        })
      );

      achs.tiered = Object.fromEntries(
        Object.entries(achs.tiered).sort(([, a], [, b]) => {
          if (a.maxPoints > b.maxPoints) return 1 * multiplier;
          if (a.maxPoints < b.maxPoints) return -1 * multiplier;

          return 0;
        })
      );
    } else if (s.criteria === 'unlocked') {
      achs.oneTime = Object.fromEntries(
        Object.entries(achs.oneTime).sort(([, a], [, b]) => {
          if ('legacy' in a) return 1;
          if ('legacy' in b) return -1;

          if (a.globalPercentUnlocked > b.globalPercentUnlocked) return 1 * multiplier;
          if (a.globalPercentUnlocked < b.globalPercentUnlocked) return -1 * multiplier;

          return 0;
        })
      );
    }

    achs = achs;
  }

  // I will refactor all of the types someday, so I don't have to use any
  function searchAchs(achs: any): any {
    return achs.filter(
      (ach: any) =>
        ach.name.toLowerCase().includes($search.toLowerCase()) ||
        ach.description.toLowerCase().includes($search.toLowerCase())
    );
  }
</script>

<div class="box relative m-4 h-[calc(100%-2rem)] p-2">
  <div class="absolute inset-4 right-2 space-y-4 overflow-auto pr-2">
    <div class="table-container">
      <table class="table-compact table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th class="table-cell-fit">Tiers</th>
            <th class="table-cell-fit">Reward</th>
          </tr>
        </thead>
        <tbody>
          {#each searchAchs(Object.values(achs.tiered)) as ach}
            {@const isCompleted = ach.completed === ach.tiers.length}
            {#if $filter === 'all' || ($filter === 'completed' && isCompleted) || ($filter === 'uncompleted' && !isCompleted)}
              <tr class:completed={isCompleted}>
                <td>{ach.name}</td>
                <td>
                  {@html ach.description.replace(
                    '%s',
                    `<span class="hover:cursor-help hover:underline" title="${ach.tiers
                      .map((t) => t.amount)
                      .join(', ')}">
                    [${ach.amount}/${
                      ach.tiers[ach.completed]?.amount ?? ach.tiers[ach.tiers.length - 1].amount
                    }]</span>`
                  )}
                </td>
                <td class="table-cell-fit text-right">
                  {ach.completed}/{ach.tiers.length}
                </td>
                <td class="table-cell-fit pr-8 text-right">
                  {ach.points}/{ach.maxPoints}&nbsp;APs
                </td>
              </tr>
            {/if}
          {/each}
        </tbody>
      </table>
    </div>
    <div class="table-container">
      <table class="table-compact table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th class="table-cell-fit">Reward</th>
            <th class="table-cell-fit">Unlocked</th>
          </tr>
        </thead>
        <tbody>
          {#each searchAchs(Object.values(achs.oneTime)) as ach}
            {#if $filter === 'all' || ($filter === 'completed' && ach.completed) || ($filter === 'uncompleted' && !ach.completed)}
              <tr class:completed={ach.completed}>
                <td>{ach.name}</td>
                <td>{ach.description}</td>
                <td class="table-cell-fit pr-8 text-right">{ach.points} APs</td>
                <td class="table-cell-fit pr-8 text-right">
                  {'globalPercentUnlocked' in ach ? formatPercentage(ach.globalPercentUnlocked) + '%' : 'legacy'}
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
    @apply bg-success-300/70 dark:bg-success-600;
  }

  tr.completed:nth-child(even) {
    @apply bg-success-300 dark:bg-success-600;
  }
</style>
