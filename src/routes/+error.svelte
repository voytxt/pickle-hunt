<script lang="ts">
  import { page } from '$app/stores';
</script>

<h1>{$page.status} {$page.error?.message} {JSON.stringify($page.data)}</h1>
