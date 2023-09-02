<script>
  import Navbar from './Navbar.svelte';
  import { background } from '../store';
</script>

<svelte:head>
  <script
    src="https://kit.fontawesome.com/7cc1bf722a.js"
    crossorigin="anonymous"
  ></script>
  <title>Random-Quote</title>
</svelte:head>

<div style="background-color:{$background}">
  <Navbar />
  <slot />
</div>

<style>
  * {
    color: white;
  }
</style>
