<script lang="ts">
  // import order of css files matters!
  // https://www.skeleton.dev/docs/get-started#stylesheets

  import '../theme.postcss';

  import '@skeletonlabs/skeleton/styles/skeleton.css';

  import '../app.postcss';

  import Name from '$lib/Name.svelte';
  import { AppBar, AppShell, LightSwitch } from '@skeletonlabs/skeleton';
  import Nav from '../lib/Nav.svelte';
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
      <svelte:fragment slot="lead">
        <strong class="text-xl">🥒 Pickle Hunt</strong>
      </svelte:fragment>

      <Name />

      <svelte:fragment slot="trail">
        <LightSwitch />
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <div class="p-2 bg-primary-50-900-token" slot="sidebarLeft">
    <Nav />
  </div>

  <slot />
</AppShell>
