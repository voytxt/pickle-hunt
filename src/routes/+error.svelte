<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="flex h-full flex-col items-center justify-center gap-8">
  <h1 class="h1 text-center text-9xl">{$page.status}</h1>
  <h2 class="h2 text-center">{$page.error?.message ?? 'Error'}</h2>
</div>
