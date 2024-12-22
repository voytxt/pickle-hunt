<script lang="ts">
  import '../app.postcss';

  import { initializeStores } from '@skeletonlabs/skeleton';

  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';

  const { children } = $props();

  inject({ mode: dev ? 'development' : 'production' });

  initializeStores();
</script>

{@render children?.()}
