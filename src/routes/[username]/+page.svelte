<script lang="ts">
  import { AppShell, Drawer } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';
  import Achievements from '../../lib/Achievements.svelte';
  import Header from '../../lib/Header.svelte';
  import Nav from '../../lib/Nav.svelte';
  import PageHeader from '../../lib/PageHeader.svelte';
  import Profile from '../../lib/Profile.svelte';
  import { fetchReference, gameNames } from '../../ts/api';
  import { reference, selectedTab } from '../../ts/stores';
  import type { PageData } from './$types';

  export let data: PageData;

  const stats: Stats = {};

  onMount(() => {
    fetchReference().then((reference) => {
      for (const [gameName, { gameId, oneTime, tiered }] of Object.entries(reference)) {
        stats[gameName] = { gameId, oneTime: {}, tiered: {} };

        for (const [id, ach] of Object.entries(oneTime)) {
          stats[gameName].oneTime[id] = {
            ...ach,
            completed: data.oneTime.includes(gameId + '_' + id),
          };
        }

        for (const [id, ach] of Object.entries(tiered)) {
          const amount = data.tiered[gameId + '_' + id] ?? 0;

          let completedTiers = 0;
          let completedReward = 0;

          for (const tier of ach.tiers) {
            if (amount >= tier.requirement) {
              completedTiers++;
              completedReward += tier.reward;
            } else {
              break;
            }
          }

          stats[gameName].tiered[id] = {
            ...ach,
            amount,
            completedTiers,
            completedReward,
          };
        }
      }
    });
  });
</script>

<svelte:head>
  <title>Pickle Hunt - {data.username}</title>
</svelte:head>

<Drawer width="w-max" bgDrawer="bg-transparent">
  <Nav uuid={data.uuid} />
</Drawer>

<AppShell>
  <svelte:fragment slot="header">
    <Header username={data.username} />
  </svelte:fragment>

  <svelte:fragment slot="sidebarLeft">
    {#if $reference !== null}
      <span class="hidden lg:inline">
        <Nav uuid={data.uuid} />
      </span>
    {/if}
  </svelte:fragment>

  <svelte:fragment slot="pageHeader">
    {#if $selectedTab !== 'profile'}
      <PageHeader />
    {/if}
  </svelte:fragment>

  {#if $reference !== null}
    {#if $selectedTab === 'profile'}
      <Profile {data} />
    {:else}
      <Achievements achievements={stats[gameNames[$selectedTab]]} />
    {/if}
  {/if}
</AppShell>
