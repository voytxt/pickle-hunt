<script lang="ts">
  import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';

  export let username = '';

  // (1) the name attribute on the input is there, because it allows for autocompletion
  // but that has a side effect: the form on submit redirects to /steve?player=steve instead of just /steve
  // the best solution I could find is to remove the name attribute right before the submit event
  // more info: https://stackoverflow.com/q/3008035
  // (2) the name is 'ign', because SkyCrypt also uses 'ign', that allows for cross-page browser suggestions
  let inputName = 'ign';
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end" class="box m-4 mb-0">
  <svelte:fragment slot="lead">
    <a href="/" class="text-2xl font-bold">
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
