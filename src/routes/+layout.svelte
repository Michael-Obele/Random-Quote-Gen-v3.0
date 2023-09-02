<script>
  import Navbar from './Navbar.svelte';
</script>

<svelte:head>
  <script
    src="https://kit.fontawesome.com/7cc1bf722a.js"
    crossorigin="anonymous"
  ></script>
  <title>Random Quotes</title>
</svelte:head>

<div class=" bg-[#03045E]">
  <Navbar />
  <slot />
</div>

<style>
  * {
    color: white;
  }
</style>
