<script lang="ts">
  import type { PageData } from '../routes/[username]/$types';

  export let data: PageData;
</script>

{data.username}
{data.achievementPoints} APs
