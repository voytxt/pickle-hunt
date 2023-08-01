<script lang="ts">
  import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
  import { AppBar, LightSwitch, drawerStore } from '@skeletonlabs/skeleton';
  import { Icon } from 'svelte-awesome';

  export let username = '';

  // (1) the name attribute on the input is there, because it allows for autocompletion
  // but that has a side effect: the form on submit redirects to /steve?player=steve instead of just /steve
  // the best solution I could find is to remove the name attribute right before the submit event
  // more info: https://stackoverflow.com/q/3008035
  // (2) the name is 'ign', because SkyCrypt also uses 'ign', that allows for cross-page browser suggestions
  let inputName = 'ign';
</script>

<AppBar
  gridColumns="grid-cols-[auto_auto_auto] lg:grid-cols-3"
  slotDefault="place-self-center"
  slotTrail="place-content-end"
  padding="p-2 lg:p-4"
  class="box mr-2 lg:mr-4"
>
  <svelte:fragment slot="lead">
    <button class="btn btn-sm mr-4 lg:hidden" on:click={() => drawerStore.open()}>
      <Icon data={faBars} scale={1.25} />
    </button>

    <a href="/" class="hidden text-2xl font-bold lg:inline">
      🥒
      <span class="logo">Pickle Hunt</span>
    </a>
  </svelte:fragment>

  <form
    method="GET"
    action="/{username}"
    class="input-group input-group-divider grid-cols-[1fr_auto]"
    on:submit={() => (inputName = '')}
  >
    <input type="text" name={inputName} bind:value={username} placeholder="Minecraft username" />

    <input type="submit" value="Submit" class="cursor-pointer px-4" />
  </form>

  <svelte:fragment slot="trail">
    <LightSwitch />
  </svelte:fragment>
</AppBar>
