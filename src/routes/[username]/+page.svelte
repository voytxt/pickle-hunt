<script lang="ts">
  import { AppShell } from '@skeletonlabs/skeleton';
  import Achievements from '../../lib/Achievements.svelte';
  import Header from '../../lib/Header.svelte';
  import Nav from '../../lib/Nav.svelte';
  import Profile from '../../lib/Profile.svelte';
  import { achievements, selectedTab } from '../../main';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<AppShell>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>

  <div slot="sidebarLeft" class="bg-gradient-to-tr from-white/60 to-white/30 p-2">
    <Nav />
  </div>

  {#if $selectedTab === 'profile'}
    <Profile {data} />
  {:else}
    <Achievements data={$achievements?.[$selectedTab] ?? { oneTime: {}, tiered: {} }} />
  {/if}
</AppShell>
