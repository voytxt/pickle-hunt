<script lang="ts">
  import type { PageData } from '../routes/[username]/$types';

  export let data: PageData;
</script>

<div class="box mr-2 h-[calc(100%-1rem)] p-4 lg:mr-4 lg:h-[calc(100%-2rem)]">
  <div class="text-center text-5xl">{data.achievementPoints} / 30000 APs</div>
</div>
