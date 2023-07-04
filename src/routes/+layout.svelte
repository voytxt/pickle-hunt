<script lang="ts">
  // import order of css files matters!
  // https://www.skeleton.dev/docs/get-started#stylesheets

  import '../theme.postcss';

  import '@skeletonlabs/skeleton/styles/skeleton.css';

  import '../app.postcss';
</script>

<slot />
