<script>
  import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';

  let username = '';
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
  <svelte:fragment slot="lead">
    <span class="text-2xl font-bold">
      🥒
      <span class="bg-gradient-to-br from-primary-600 to-secondary-600 bg-clip-text text-transparent">Pickle Hunt</span>
    </span>
  </svelte:fragment>

  <form method="GET" action="/{username}" class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
    <input type="text" bind:value={username} placeholder="Minecraft username" />

    <input type="submit" value="Submit" class="cursor-pointer px-4" />
  </form>

  <svelte:fragment slot="trail">
    <LightSwitch />
  </svelte:fragment>
</AppBar>
