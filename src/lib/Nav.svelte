<script lang="ts">
  import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
  import { reference, selectedTab } from '../ts/stores';

  export let uuid: string;

  type Tab = 'hr' | { name: string; id: string; icon: string };

  function getTabs(): Tab[] {
    const games = Object.entries($reference!).map(([name, { gameId }]) => {
      return {
        name,
        id: gameId,

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
      icon: `https://mc-heads.net/avatar/${uuid}/44`,
    });

    tabs.splice(1, 0, 'hr');
    tabs.splice(-5, 0, 'hr');

    return tabs;
  }
</script>

<div class="box bg-surface-50-900-token m-4 mr-0 h-[calc(100%-2rem)] p-2 pr-1 shadow-md rounded-token">
  <ListBox padding="p-1" class="m-2 h-[calc(100%-1rem)] select-none overflow-auto">
    {#each getTabs() as tab}
      {#if tab === 'hr'}
        <hr class="!my-2 mx-auto w-1/2" />
      {:else}
        <ListBoxItem bind:group={$selectedTab} value={tab.id} class="mr-4" name="tab">
          <svelte:fragment slot="lead">
            <img src={tab.icon} class="h-8 w-8 rounded-md" alt="" />
          </svelte:fragment>
          {tab.name}
        </ListBoxItem>
      {/if}
    {/each}
  </ListBox>
</div>
