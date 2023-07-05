<script lang="ts">
  import { AppShell } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import Header from '../lib/Header.svelte';
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

<AppShell>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>

  <div class="flex h-full flex-col items-center justify-center gap-4 text-white">
    <h1 class="h1 text-center text-9xl">Pickle Hunt</h1>
    <h2 class="h2 text-center">Hypixel Achievement Tracker</h2>
    <span class="text-lg">
      Source code: <a href="https://github.com/vojta-dev/pickle-hunt">GitHub</a><br />
      APIs used: <a href="https://developer.hypixel.net/">Hypixel API</a>, <a href="https://mc-heads.net">MCHeads</a><br
      />
      Technologies: <a href="https://kit.svelte.dev/">SvelteKit</a>,
      <a href="https://tailwindcss.com/">Tailwind CSS</a>, <a href="https://www.skeleton.dev/">Skeleton UI</a>
    </span>
  </div>
</AppShell>

<!-- fetch achievements and game names before / while user types their username -->
<!-- ^ do that every time on the landing page -->
<!-- also fetch them on username route once they expire (when?) -->
<!-- infinite speed 🚀 -->

<style>
  a {
    @apply font-bold text-primary-700;
  }
</style>
