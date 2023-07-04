<script>
  import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
  import Name from './Name.svelte';
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
  <svelte:fragment slot="lead">
    <span class="text-2xl font-bold">
      🥒
      <span class="bg-gradient-to-br from-primary-600 to-secondary-600 bg-clip-text text-transparent">Pickle Hunt</span>
    </span>
  </svelte:fragment>

  <Name />

  <svelte:fragment slot="trail">
    <LightSwitch />
  </svelte:fragment>
</AppBar>
