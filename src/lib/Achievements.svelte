<script lang="ts">
  import { ProgressBar } from '@skeletonlabs/skeleton';

  export let achs: {
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
    tiered: Record<string, { name: string; description: string; completed: boolean }>;
  };

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
            <th>Tiers</th>
            <th class="table-cell-fit">Reward</th>
          </tr>
        </thead>
        <tbody>
          {#each Object.values(achs.tiered) as ach}
            <tr>
              <td>{ach.name}</td>
              <!-- <td>{ach.description.replace('%s', `[${ach.tiers.map((t) => t.amount).join(', ')}]`)}</td> -->
              <td>
                3/5
                <ProgressBar label="Progress Bar" value={3} max={5} />
              </td>
              <!-- <td class="table-cell-fit pr-8 text-right">{ach.tiers.map((t) => t.points).join(', ')} APs</td> -->
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
