<script lang="ts">
  import Header from '$lib/Header.svelte';
  import { fetchReference } from '$lib/api';
  import { faFontAwesome } from '@fortawesome/free-solid-svg-icons/faFontAwesome';
  import { AppShell, Modal, modalStore } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';
  import { Icon } from 'svelte-awesome';

  onMount(() => {
    fetchReference();
  });
</script>

<Modal />

<AppShell>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>

  <div class="flex h-full items-center justify-center gap-4">
    <div class="box p-10 !shadow-2xl">
      <h1 class="logo h1 mb-3 text-center text-5xl font-bold">Pickle Hunt</h1>

      <h2 class="h2 text-center text-2xl">
        Hypixel Achievement Tracker by
        <a href="https://github.com/vojta-dev" target="_blank" class="underline underline-offset-2">Vojta</a>
      </h2>

      <hr class="mx-2 mb-6 mt-8" />

      <h3 class="h3 mb-3 text-center text-xl">Special thanks</h3>

      <div class="logo-cloud grid-cols-3 gap-0.5">
        <a href="https://mc-heads.net" target="_blank" class="logo-item">
          <img src="https://mc-heads.net/avatar/MHF_Steve/32" alt="" />
          <span>MCHeads</span>
        </a>

        <a href="https://fontawesome.com" target="_blank" class="logo-item">
          <Icon data={faFontAwesome} scale={2} />
          <span>Font Awesome</span>
        </a>

        <button
          class="logo-item hover:brightness-110"
          on:click={() => {
            modalStore.trigger({
              type: 'alert',
              title: 'Momen & Litphoenix',
              body: 'Momen (Discord: mo2men) and Litphoenix (Discord: litphoenix) created icons for seasonal achievements (easter, summer, halloween, christmas)',
              buttonTextCancel: 'Alright',
            });
          }}
        >
          <img src="/icons/christmas.png" class="h-8" alt="" />
          <span>Momen & Litphoenix</span>
        </button>
      </div>
    </div>
  </div>
</AppShell>

<style lang="postcss">
  .logo-item {
    @apply px-6;
  }
</style>
