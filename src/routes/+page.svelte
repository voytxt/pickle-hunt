<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { achievements, gameNames, getAchievements, getGameNames } from '../main';

  onMount(() => {
    if (get(gameNames) === null) {
      getGameNames().then((data) => {
        gameNames.set(data);
      });
    }

    if (get(achievements) === null) {
      getAchievements().then((data) => {
        achievements.set(data);
      });
    }
  });
</script>

<div class="container mx-auto flex h-full items-center justify-center">
  <div class="space-y-5">
    <button class="btn variant-filled-primary">Hello World</button>
  </div>
</div>
