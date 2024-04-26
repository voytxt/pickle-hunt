<script lang="ts">
  import '../app.postcss';

  import { initializeStores } from '@skeletonlabs/skeleton';

  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';

  inject({ mode: dev ? 'development' : 'production' });

  initializeStores();
</script>

<slot />
