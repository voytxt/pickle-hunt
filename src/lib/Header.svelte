<script lang="ts">
  import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';

  export let username = '';
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end" class="box m-4 mb-0">
  <svelte:fragment slot="lead">
    <a href="/" class="text-2xl font-bold">
      🥒
      <span class="logo">Pickle Hunt</span>
    </a>
  </svelte:fragment>

  <form method="GET" action="/{username}" class="input-group input-group-divider grid-cols-[1fr_auto]">
    <input type="text" bind:value={username} placeholder="Minecraft username" />

    <input type="submit" value="Submit" class="cursor-pointer px-4" />
  </form>

  <svelte:fragment slot="trail">
    <LightSwitch />
  </svelte:fragment>
</AppBar>
