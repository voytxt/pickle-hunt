<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import Achievements from '../lib/Achievements.svelte';
  import Profile from '../lib/Profile.svelte';
  import { achievements, gameNames, getAchievements, getGameNames, selectedTab } from '../main';

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

  let tab = '';

  selectedTab.subscribe((t) => (tab = t));
</script>

{#if tab === 'Profile'}
  <Profile />
{:else}
  <Achievements />
{/if}

<!-- <div class="container mx-auto flex h-full items-center justify-center">
  <div class="space-y-5">
    <button class="btn variant-filled-primary">Hello World</button>
  </div>
</div> -->
