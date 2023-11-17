<script>
  import Navbar from '$lib/Navbar.svelte';
  import { background } from '$lib/store';
</script>

<svelte:head>
  <title>Random Quote</title>
</svelte:head>

<div class="dark h-fit" style="background-color:{$background}">
  <Navbar />
    <slot />
</div>

<style>
  * {
    color: white;
  }
</style>
