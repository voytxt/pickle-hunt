<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
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

todo landing page

<!-- fetch achievements and game names before / while user types their username -->
<!-- ^ do that every time on the landing page -->
<!-- also fetch them on username route once they expire (when?) -->
<!-- infinite speed 🚀 -->
