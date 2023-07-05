<script lang="ts">
  import { AppShell } from '@skeletonlabs/skeleton';
  import Achievements from '../../lib/Achievements.svelte';
  import Header from '../../lib/Header.svelte';
  import Nav from '../../lib/Nav.svelte';
  import Profile from '../../lib/Profile.svelte';
  import { achievements, selectedTab, type Achs } from '../../main';
  import type { PageData } from './$types';

  export let data: PageData;

  const achs: Achs = {};

  $: {
    if ($achievements !== null) {
      for (const [gameName, game] of Object.entries($achievements)) {
        achs[gameName] = { oneTime: {}, tiered: {} };

        for (const [id, ach] of Object.entries(game.oneTime)) {
          achs[gameName].oneTime[id] = {
            ...ach,
            completed: data.achievementsOneTime.includes(gameName + '_' + id.toLowerCase()),
          };
        }

        for (const [id, ach] of Object.entries(game.tiered)) {
          achs[gameName].tiered[id] = {
            ...ach,
            completed: false,
          };
        }
      }
    }
  }
</script>

<AppShell>
  <svelte:fragment slot="header">
    <Header username={data.username} />
  </svelte:fragment>

  <svelte:fragment slot="sidebarLeft">
    <Nav username={data.username} />
  </svelte:fragment>

  {#if $selectedTab === 'profile'}
    <Profile {data} />
  {:else}
    <Achievements achs={achs[$selectedTab]} />
  {/if}
</AppShell>
