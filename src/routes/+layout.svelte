<script>
  import Footer from '$lib/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import { background } from '$lib/store';
</script>

<svelte:head>
  <title>Random Quote</title>
</svelte:head>

<div
  class="dark relative max-h-fit min-h-screen pt-[10rem] align-middle"
  style="background-color:{$background}"
>
  <Navbar />
  <div class="invisible-scrollbar pb-52">
    <slot />
  </div>
  <Footer />
</div>
