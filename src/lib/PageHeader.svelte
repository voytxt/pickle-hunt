<script lang="ts">
  import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
  import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
  import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
  import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
  import { Icon } from 'svelte-awesome';
  import { filter, search, sort } from '../ts/stores';
</script>

<div class="box m-4 mb-0 flex select-none justify-center gap-4 p-4">
  <RadioGroup>
    <RadioItem bind:group={$filter} name="" value="all">All</RadioItem>
    <RadioItem bind:group={$filter} name="" value="completed">Completed</RadioItem>
    <RadioItem bind:group={$filter} name="" value="uncompleted">Uncompleted</RadioItem>
  </RadioGroup>

  <div class="input-group input-group-divider grid-cols-[auto_1fr]">
    <div class="input-group-shim"><Icon data={faMagnifyingGlass} /></div>
    <input type="search" bind:value={$search} placeholder="Search..." />
  </div>

  <RadioGroup>
    <RadioItem bind:group={$sort.direction} name="" value="ascending" class="flex h-full">
      <Icon data={faArrowDown} class="my-auto" />
    </RadioItem>
    <RadioItem bind:group={$sort.direction} name="" value="descending" class="flex h-full">
      <Icon data={faArrowUp} class="my-auto" />
    </RadioItem>
    <div class="bg-surface-400-500-token my-1 !ml-2 !mr-1 w-px" />
    <RadioItem bind:group={$sort.criteria} name="" value="name">Name</RadioItem>
    <RadioItem bind:group={$sort.criteria} name="" value="reward">Reward</RadioItem>
    <RadioItem bind:group={$sort.criteria} name="" value="unlocked">Unlocked</RadioItem>
  </RadioGroup>
</div>
