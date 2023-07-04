<script lang="ts">
  import { ProgressBar } from '@skeletonlabs/skeleton';
  import type { Game } from '../main';

  export let data: Game;

  function formatPercentage(percentage: number): string {
    if (percentage >= 10) return Math.round(percentage).toString();
    if (percentage >= 1) return (Math.round(percentage * 10) / 10).toString();

    return percentage.toPrecision(1);
  }
</script>

<div class="m-4 space-y-4">
  <div class="table-container">
    <table class="table-hover table-compact table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Tiers</th>
          <th class="table-cell-fit">Reward</th>
        </tr>
      </thead>
      <tbody>
        {#each Object.values(data.tiered) as ach}
          <tr>
            <td>{ach.name}</td>
            <td>{ach.description.replace('%s', `[${ach.tiers.map((t) => t.amount).join(', ')}]`)}</td>

            <td>
              3/5
              <ProgressBar label="Progress Bar" value={3} max={5} />
            </td>
            <!-- <td class="table-cell-fit pr-8 text-right">{ach.tiers.reduce((a, tier) => a + tier.points, 0)} APs</td> -->
            <td class="table-cell-fit pr-8 text-right">{ach.tiers.map((t) => t.points).join(', ')} APs</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="table-container">
    <table class="table-hover table-compact table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th class="table-cell-fit">Reward</th>
          <th class="table-cell-fit">Unlocked</th>
        </tr>
      </thead>
      <tbody>
        {#each Object.values(data.oneTime) as ach}
          <tr>
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

<style>
  table tr td {
    padding: 0 1rem;
    @apply text-base;
  }
</style>
