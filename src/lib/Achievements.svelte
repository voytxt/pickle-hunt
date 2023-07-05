<script lang="ts">
  import type { Achs } from '../main';

  export let achs: Achs;

  function formatPercentage(percentage: number): string {
    if (percentage >= 10) return Math.round(percentage).toString();
    if (percentage >= 1) return (Math.round(percentage * 10) / 10).toString();

    return percentage.toPrecision(1);
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
          {#each Object.values(achs.tiered) as ach}
            <tr class:completed={ach.completed === ach.tiers.length}>
              <td>{ach.name}</td>
              <td>
                {@html ach.description.replace(
                  '%s',
                  `<span class="hover:cursor-help hover:underline" title="${ach.tiers.map((t) => t.amount).join(', ')}">
                    [${ach.amount}/${
                    ach.tiers[ach.completed]?.amount ?? ach.tiers[ach.tiers.length - 1].amount
                  }]</span>`
                )}
              </td>
              <td class="table-cell-fit">
                {ach.completed}/{ach.tiers.length}
              </td>
              <td class="table-cell-fit pr-8 text-right">
                {ach.points}/{ach.tiers.map((t) => t.points).reduce((a, b) => a + b, 0)}&nbsp;APs
              </td>
            </tr>
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
          {#each Object.values(achs.oneTime) as ach}
            <tr class:completed={ach.completed}>
              <td>{ach.name}</td>
              <td>{ach.description}</td>
              <td class="table-cell-fit pr-8 text-right">{ach.points} APs</td>
              <td class="table-cell-fit pr-8 text-right">
                {'globalPercentUnlocked' in ach ? formatPercentage(ach.globalPercentUnlocked) + '%' : 'legacy'}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<style>
  table tr td {
    padding: 0 1rem;
    @apply text-base;
  }

  tr.completed {
    @apply bg-success-200-700-token;
  }

  tr.completed:nth-child(even) {
    @apply bg-success-300-600-token;
  }
</style>
