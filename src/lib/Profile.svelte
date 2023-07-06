<script lang="ts">
  import type { PageData } from '../routes/[username]/$types';

  export let data: PageData;
</script>

<div class="box m-4 h-[calc(100%-2rem)] p-4">
  <div class="text-center text-5xl">{data.achievementPoints} / 30000 APs</div>
</div>
