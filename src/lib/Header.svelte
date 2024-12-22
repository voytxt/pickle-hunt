<script lang="ts">
  import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
  import { AppBar, LightSwitch, getDrawerStore } from '@skeletonlabs/skeleton';
  import { Icon } from 'svelte-awesome';

  let { username = $bindable('') }: { username?: string } = $props();

  const drawerStore = getDrawerStore();

  // (1) the name attribute on the input is there, because it allows for autocompletion
  // but that has a side effect: the form on submit redirects to /steve?player=steve instead of just /steve
  // the best solution I could find is to remove the name attribute right before the submit event
  // more info: https://stackoverflow.com/q/3008035
  // (2) the name is 'ign', because SkyCrypt also uses 'ign', that allows for cross-page browser suggestions
  let inputName = $state('ign');
</script>

<AppBar
  gridColumns="grid-cols-[auto_auto_auto] lg:grid-cols-3"
  slotDefault="place-self-center"
  slotTrail="place-content-end"
  padding="p-2 lg:p-4"
  class="box mr-2 lg:mr-4"
>
  {#snippet lead()}
    <button class="btn btn-sm mr-4 lg:hidden" onclick={() => drawerStore.open()}>
      <Icon data={faBars} scale={1.25} />
    </button>

    <a href="/" class="hidden text-2xl font-bold lg:inline">
      🥒
      <span class="logo">Pickle Hunt</span>
    </a>
  {/snippet}

  <form
    method="GET"
    action="/{username}"
    class="input-group input-group-divider grid-cols-[1fr_auto]"
    onsubmit={() => (inputName = '')}
  >
    <input type="text" name={inputName} bind:value={username} placeholder="Minecraft username" />

    <input type="submit" value="Submit" class="cursor-pointer px-4" />
  </form>

  {#snippet trail()}
    <LightSwitch />
  {/snippet}
</AppBar>

<!--
  the LightSwitch sun icon svg becomes blurry when hovering over the username form

  this happens when hovering over an element A that has a hover transition to a filter
  (the filter doesn't have to change anything, it can be like brightness(1))
  now for the duration that A's transition lasts, the sun svg with a scale transform (.8 by default) will be blurry
  reproduction: https://svelte.dev/playground/6302f0ce7a9a4289b3e1a73f9ce0d221?version=5.15.0

  the code below scales the svg back to 100%, and then applies a bit of ugly margin to move it back to the correct place
-->
<style lang="postcss">
  :global(.lightswitch-thumb) {
    @apply ml-[6px] mt-[2px] !h-5 !scale-100;
  }

  :global(.dark .lightswitch-thumb) {
    @apply ml-[2px];
  }
</style>
