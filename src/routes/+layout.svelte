<script lang="ts">
  // import order of css files matters!
  // https://www.skeleton.dev/docs/get-started#stylesheets

  import '../theme.postcss';

  import '@skeletonlabs/skeleton/styles/skeleton.css';

  import '../app.postcss';

  import { AppShell } from '@skeletonlabs/skeleton';
  import Header from '../lib/Header.svelte';
  import Nav from '../lib/Nav.svelte';
</script>

<AppShell>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>

  <div slot="sidebarLeft" class="bg-gradient-to-tr from-white/60 to-white/30 p-2">
    <Nav />
  </div>

  <slot />
</AppShell>
