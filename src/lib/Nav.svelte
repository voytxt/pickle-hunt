<script lang="ts">
  import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
  import { get } from 'svelte/store';
  import { achievements, gameNames, selectedTab } from '../main';

  function getGameIcon(gameName: string) {
    const fileNames: Record<string, string> = {
      bedwars: 'BedWars',
      skywars: 'Skywars',
      murdermystery: 'MurderMystery',
      arcade: 'Arcade',
      arena: 'Arena',
      blitz: 'SG',
      buildbattle: 'BuildBattle',
      copsandcrims: 'CVC',
      duels: 'Duels',
      gingerbread: 'TurboKartRacers',
      housing: 'Housing',
      paintball: 'Paintball',
      quake: 'Quakecraft',
      supersmash: 'SmashHeroes',
      tntgames: 'TNT',
      walls3: 'MegaWalls',
      walls: 'Walls',
      warlords: 'Warlords',
      woolgames: 'WoolWars',
      pit: 'Pit',
      skyblock: 'SkyBlock',
      uhc: 'UHC',
      vampirez: 'VampireZ',
      truecombat: 'CrazyWalls',
      speeduhc: 'SpeedUHC',
      skyclash: 'SkyClash',
    };

    const fileName = fileNames[gameName];

    if (fileName === undefined) {
      return '/hypixel-64.png';
    } else {
      return 'https://hypixel.net/styles/hypixel-v2/images/game-icons/' + fileNames[gameName] + '-64.png';
    }
  }

  function getGameName(gameName: string) {
    return get(gameNames)?.[gameName] ?? '???';
  }

  export let username: string;
</script>

<div class="box m-4 mr-0 h-[calc(100%-2rem)] p-2 pr-1 shadow-md bg-surface-50-900-token rounded-token">
  <ListBox padding="p-1" class="m-2 h-[calc(100%-1rem)] select-none overflow-auto">
    <ListBoxItem bind:group={$selectedTab} name="profile" value="profile" class="mr-4">
      <svelte:fragment slot="lead">
        <img src="https://mc-heads.net/avatar/{username}/44" alt="" />
      </svelte:fragment>
      Profile
    </ListBoxItem>
    <hr class="w-1/2" />
    {#if $achievements === null || $gameNames === null}
      {#each Array(20).fill(0) as _}
        {@const width = ['w-20', 'w-24', 'w-32'][Math.floor(Math.random() * 3)]}
        <div class="flex items-center gap-4 px-1 py-1 rounded-token">
          <div class="placeholder h-8 w-8 animate-pulse rounded-md" />
          <div class="placeholder h-3 animate-pulse {width}" />
        </div>
      {/each}
    {:else}
      {#each Object.keys($achievements) as name}
        <ListBoxItem bind:group={$selectedTab} {name} value={name} class="mr-4">
          <svelte:fragment slot="lead">
            <img src={getGameIcon(name)} alt="" />
          </svelte:fragment>
          {getGameName(name)}
        </ListBoxItem>
      {/each}
    {/if}
  </ListBox>
</div>

<style>
  img {
    @apply h-8 w-8 rounded-md;
  }

  hr {
    margin: 0.5rem auto !important;
  }
</style>
