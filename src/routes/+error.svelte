<script lang="ts">
  import { page } from '$app/stores';
  import Header from '$lib/Header.svelte';
  import { AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>
  <div class="flex h-full flex-col items-center justify-center gap-8">
    <h1 class="h1 text-center text-9xl">{$page.status}</h1>
    <h2 class="h2 text-center">{$page.error?.message ?? 'Error'}</h2>
  </div>
</AppShell>
