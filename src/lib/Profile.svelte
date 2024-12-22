<script lang="ts">
  let { achievementPoints }: { achievementPoints: number } = $props();
</script>

<div class="box mr-2 h-[calc(100%-1rem)] p-4 lg:mr-4 lg:h-[calc(100%-2rem)]">
  <div class="text-center text-5xl">{achievementPoints} / 30000 APs</div>
  // todo
</div>
