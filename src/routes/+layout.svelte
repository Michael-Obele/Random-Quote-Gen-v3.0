<script>
  import Navbar from './Navbar.svelte';
  import { background } from '../store';
  import { page } from '$app/stores';
  import { afterUpdate } from 'svelte';
  afterUpdate(() => {
    current_url = $page.url.pathname.split('/').filter(Boolean).pop() || '/';
    console.log('current_url = ', current_url);
  });
  let current_url = $page.url.pathname.split('/').filter(Boolean).pop() || '/';
</script>

<svelte:head>
  <script
    src="https://kit.fontawesome.com/7cc1bf722a.js"
    crossorigin="anonymous"
  ></script>
  <title>Random-Quote</title>
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
