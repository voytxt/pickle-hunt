<script lang="ts">
  import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
  import { get } from 'svelte/store';
  import { achievements, gameNames } from '../main';

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

  let valueSingle = 'Profile';
</script>

<ListBox padding="py-1 pl-1 pr-2">
  <ListBoxItem bind:group={valueSingle} name="Profile" value="Profile">
    <svelte:fragment slot="lead">
      <img src="https://mc-heads.net/avatar/vojtaprofik/44" alt="" />
    </svelte:fragment>
    Profile
  </ListBoxItem>

  <hr />

  {#if $achievements !== null && $gameNames !== null}
    {#each Object.entries($achievements) as [name, game]}
      <ListBoxItem bind:group={valueSingle} {name} value={name}>
        <svelte:fragment slot="lead">
          <img src={getGameIcon(name)} alt="" />
        </svelte:fragment>
        {getGameName(name)}
      </ListBoxItem>
    {/each}
  {/if}
</ListBox>

<style>
  img {
    @apply w-8 rounded-md;
  }

  hr {
    @apply w-1/2;
    margin: 0.5rem auto !important;
  }
</style>
