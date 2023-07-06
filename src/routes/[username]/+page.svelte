<script lang="ts">
  import { AppShell } from '@skeletonlabs/skeleton';
  import Achievements from '../../lib/Achievements.svelte';
  import Header from '../../lib/Header.svelte';
  import Nav from '../../lib/Nav.svelte';
  import PageHeader from '../../lib/PageHeader.svelte';
  import Profile from '../../lib/Profile.svelte';
  import { achievements, selectedTab, type GameAchs } from '../../main';
  import type { PageData } from './$types';

  export let data: PageData;

  const achs: GameAchs = {};

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
          const amount = data.achievements[gameName + '_' + id.toLowerCase()] ?? 0;

          let completed = 0;
          let points = 0;

          for (const tier of ach.tiers) {
            if (amount >= tier.amount) {
              completed++;
              points += tier.points;
            } else {
              break;
            }
          }

          achs[gameName].tiered[id] = {
            ...ach,
            completed,
            points,
            amount,
            maxPoints: ach.tiers.reduce((sum, tier) => sum + tier.points, 0),
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

  <svelte:fragment slot="pageHeader">
    {#if $selectedTab !== 'profile'}
      <PageHeader />
    {/if}
  </svelte:fragment>

  {#if $selectedTab === 'profile'}
    <Profile {data} />
  {:else}
    <Achievements achs={achs[$selectedTab]} />
  {/if}
</AppShell>
