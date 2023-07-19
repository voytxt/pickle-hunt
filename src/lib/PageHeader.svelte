<script lang="ts">
  import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
  import { filter, search, sort } from '../main';
</script>

<div class="box m-4 mb-0 flex select-none justify-center gap-4 p-4">
  <RadioGroup>
    <RadioItem bind:group={$filter} name="" value="all">All</RadioItem>
    <RadioItem bind:group={$filter} name="" value="completed">Completed</RadioItem>
    <RadioItem bind:group={$filter} name="" value="uncompleted">Uncompleted</RadioItem>
  </RadioGroup>

  <input type="search" bind:value={$search} class="input" placeholder="Search" />

  <RadioGroup>
    <RadioItem bind:group={$sort.direction} name="" value="ascending" class="flex h-full">
      <svg xmlns="http://www.w3.org/2000/svg" class="my-auto h-4 fill-current" viewBox="0 0 384 512">
        <path
          d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
        />
      </svg>
    </RadioItem>
    <RadioItem bind:group={$sort.direction} name="" value="descending" class="flex h-full">
      <svg xmlns="http://www.w3.org/2000/svg" class="my-auto h-4 fill-current" viewBox="0 0 384 512">
        <path
          d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
        />
      </svg>
    </RadioItem>
    <div class="my-1 !ml-2 !mr-1 w-px bg-surface-400-500-token" />
    <RadioItem bind:group={$sort.criteria} name="" value="name">Name</RadioItem>
    <RadioItem bind:group={$sort.criteria} name="" value="reward">Reward</RadioItem>
    <RadioItem bind:group={$sort.criteria} name="" value="unlocked">Unlocked</RadioItem>
  </RadioGroup>
</div>
