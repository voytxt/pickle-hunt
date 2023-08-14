<script lang="ts">
  import Achievements from '$lib/Achievements.svelte';
  import Header from '$lib/Header.svelte';
  import Nav from '$lib/Nav.svelte';
  import PageHeader from '$lib/PageHeader.svelte';
  import Profile from '$lib/Profile.svelte';
  import { fetchReference } from '$lib/api';
  import { reference, selectedTab, stats } from '$lib/stores';
  import { AppShell, Drawer } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  onMount(() => {
    fetchReference();
  });

  // the $ is here, because when the username gets changed,
  // and the page gets new data, we need to update the stats
  $: {
    if ($reference !== null) {
      $stats = getStats($reference, data);
    }
  }

  function getStats(reference: Reference, data: PageData) {
    const stats: Stats = {};

    for (const [gameName, { gameId, oneTime, tiered }] of Object.entries(reference)) {
      stats[gameName] = { gameId, oneTime: {}, tiered: {}, completedReward: 0, totalReward: 0 };

      for (const [id, ach] of Object.entries(oneTime)) {
        const completed = data.oneTime.includes(gameId + '_' + id);

        stats[gameName].totalReward += ach.reward;
        if (completed) stats[gameName].completedReward += ach.reward;

        stats[gameName].oneTime[id] = {
          ...ach,
          completed,
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

    return stats;
  }
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
    <span class="hidden lg:inline">
      <Nav uuid={data.uuid} />
    </span>
  </svelte:fragment>

  <svelte:fragment slot="pageHeader">
    {#if $selectedTab !== 'profile'}
      <PageHeader />
    {/if}
  </svelte:fragment>

  {#if $selectedTab === 'profile'}
    <Profile achievementPoints={data.achievementPoints} />
  {:else}
    <Achievements />
  {/if}
</AppShell>
