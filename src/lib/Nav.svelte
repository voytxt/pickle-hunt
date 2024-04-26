<script lang="ts">
  import { ListBox, ListBoxItem, getDrawerStore } from '@skeletonlabs/skeleton';
  import { selectedTab, stats } from './stores';

  export let uuid: string;

  const drawerStore = getDrawerStore();

  type Tab = 'hr' | { name: string; id: string; progress: number; icon: string };

  function getTabs(stats: Stats): Tab[] {
    const games = Object.entries(stats).map(([name, game]) => {
      return {
        name,
        id: game.gameId,
        progress: Math.floor((game.completedReward / game.totalReward) * 100),

        // game icons from https://hypixel.net/styles/hypixel-v2/images/game-icons/GameName-64.png
        // seasonal icons from the hypixel achievement hunting community discord server
        // "general" icon (hypixel logo) from https://www.facebook.com/Hypixel/ and manually rescaled to 64x64
        icon: `/icons/${name.toLowerCase()}.png`,
      };
    });

    const priorities: Record<string, number> = {
      General: -1,
      Easter: -2,
      Summer: -3,
      Halloween: -4,
      Christmas: -5,
    };

    const tabs: Tab[] = games.sort((a, b) => {
      const priorityA = priorities[a.name];
      const priorityB = priorities[b.name];

      // no priorities, sort alphabetically
      if (priorityA === undefined && priorityB === undefined) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }

      // if only one has a priority, push it down
      if (priorityA === undefined) return -1;
      if (priorityB === undefined) return 1;

      // both have priorities, compare them
      return priorityB - priorityA;
    });

    tabs.unshift({
      name: 'Profile',
      id: 'profile',
      progress: 100,
      icon: `https://mc-heads.net/avatar/${uuid}/44`,
    });

    tabs.splice(1, 0, 'hr');
    tabs.splice(-5, 0, 'hr');

    return tabs;
  }
</script>

{#if $stats !== null}
  <div class="box bg-surface-50-900-token h-[calc(100%-1rem)] p-2 pr-1 shadow-md rounded-token lg:h-[calc(100%-2rem)]">
    <div class="mb-4 mr-6 text-center lg:hidden">
      <a href="/" class="text-2xl font-bold">
        🥒
        <span class="logo">Pickle Hunt</span>
      </a>
    </div>

    <ListBox padding="p-2" class="m-2 h-[calc(100%-3.5rem)] select-none overflow-auto lg:h-[calc(100%-1rem)]">
      {#each getTabs($stats) as tab}
        {#if tab === 'hr'}
          <hr class="!my-2 mx-auto w-1/2" />
        {:else}
          <ListBoxItem
            on:click={() => drawerStore.close()}
            bind:group={$selectedTab}
            value={tab.id}
            class="mr-4"
            name="tab"
          >
            <svelte:fragment slot="lead">
              <!-- https://stackoverflow.com/a/74099159 -->
              <div
                class="progress relative h-8 w-8 rounded-lg content-none after:absolute after:-inset-1 after:rounded-lg"
                style="--progress: {tab.progress}%"
              >
                <img src={tab.icon} class="absolute z-10 rounded-md" alt="" />
              </div>
            </svelte:fragment>
            {tab.name}
          </ListBoxItem>
        {/if}
      {/each}
    </ListBox>
  </div>
{/if}

<style>
  .progress::after {
    background-image: conic-gradient(
      rgb(var(--color-success-400)) var(--progress),
      rgb(var(--color-surface-700)) var(--progress)
    );
  }
</style>
