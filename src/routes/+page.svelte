<script lang="ts">
  import { AppShell, Modal, modalStore } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import Header from '../lib/Header.svelte';
  import { achievements, gameNames, getAchievements, getGameNames } from '../main';

  onMount(() => {
    if (get(gameNames) === null) {
      getGameNames().then((data) => {
        gameNames.set(data);
      });
    }

    if (get(achievements) === null) {
      getAchievements().then((data) => {
        achievements.set(data);
      });
    }
  });
</script>

<Modal />

<AppShell>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>

  <div class="flex h-full items-center justify-center gap-4">
    <div class="box p-10 !shadow-2xl">
      <h1 class="logo h1 mb-3 text-center font-bold">Pickle Hunt</h1>

      <h2 class="h2 text-center text-2xl">
        Hypixel Achievement Tracker by
        <a href="https://github.com/vojta-dev" target="_blank" class="underline underline-offset-2">Vojta</a>
      </h2>

      <hr class="mx-2 mb-6 mt-8" />

      <h3 class="h3 mb-3 text-center text-xl">Special thanks</h3>

      <div class="logo-cloud grid-cols-3 gap-0.5">
        <a href="https://mc-heads.net" target="_blank" class="logo-item">
          <img src="https://mc-heads.net/avatar/MHF_Steve/24" alt="" />
          <span>MCHeads</span>
        </a>

        <a href="https://fontawesome.com" target="_blank" class="logo-item">
          <svg xmlns="http://www.w3.org/2000/svg" class="fill-current" viewBox="0 0 448 512">
            <path
              d="M448 48V384c-63.1 22.5-82.3 32-119.5 32c-62.8 0-86.6-32-149.3-32c-20.6 0-36.6 3.6-51.2 8.2v-64c14.6-4.6 30.6-8.2 51.2-8.2c62.7 0 86.5 32 149.3 32c20.4 0 35.6-3 55.5-9.3v-208c-19.9 6.3-35.1 9.3-55.5 9.3c-62.8 0-86.6-32-149.3-32c-50.8 0-74.9 20.6-115.2 28.7V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32s32 14.3 32 32V76.7c40.3-8 64.4-28.7 115.2-28.7c62.7 0 86.5 32 149.3 32c37.1 0 56.4-9.5 119.5-32z"
            />
          </svg>
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
          <img src="https://cdn.discordapp.com/emojis/1096563237929107467.webp" alt="" />
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

  .logo-item img,
  .logo-item svg {
    @apply h-8;
  }
</style>
