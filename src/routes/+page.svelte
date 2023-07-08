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

  <div class="flex h-full flex-col items-center justify-center gap-4">
    <div class="box p-10">
      <h1
        class="h1 mb-3 bg-gradient-to-br from-primary-600 to-secondary-600 bg-clip-text text-center font-bold text-transparent dark:from-primary-200 dark:to-secondary-200"
      >
        Pickle Hunt
      </h1>

      <h2 class="h2 text-center text-2xl">
        Hypixel Achievement Tracker by
        <a href="https://github.com/vojta-dev" target="_blank" class="underline underline-offset-2">Vojta</a>
      </h2>

      <!-- <a href="https://github.com/vojta-dev/pickle-hunt" class="logo-item">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
        <path
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
        />
      </svg>
      <span>Source Code</span>
    </a> -->

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
              title: 'new phone who Momen??',
              body: "Momen made the icons for seasonal achievements, cuz Hypixel doesn't have those. Discord username: mo2men",
              buttonTextCancel: 'Alright',
            });
          }}
        >
          <img
            src="https://cdn.discordapp.com/avatars/310019544792039426/293d79b4bda4c65248ec3c0400d03baa.webp"
            alt=""
          />
          <span>Momen</span>
        </button>
      </div>
    </div>
  </div>
</AppShell>

<style>
  .logo-item {
    @apply px-6;
  }

  .logo-item img,
  .logo-item svg {
    @apply h-8;
  }
</style>
