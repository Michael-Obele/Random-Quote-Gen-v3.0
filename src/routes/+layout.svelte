<script>
  import Navbar from '../Components/Navbar.svelte';
  import { background } from '../store';
</script>

<svelte:head>
  <title>Random Quote</title>
</svelte:head>

<div class="h-fit pb-[60vh]" style="background-color:{$background}">
  <Navbar />
  <slot />
</div>

<style>
  * {
    color: white;
  }
</style>
