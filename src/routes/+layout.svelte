<script>
  import Footer from '$lib/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import { ModeWatcher } from 'mode-watcher';
</script>

<svelte:head>
  <title>Random Quote</title>
</svelte:head>

<div class="dark">
  <div
    class="relative max-h-fit min-h-screen bg-slate-500 pt-[10rem] align-middle dark:bg-gray-950 dark:text-white"
  >
    <Navbar />
    <div class="container mx-auto min-h-screen pb-52">
      <ModeWatcher />
      <slot />
    </div>
    <Footer />
  </div>
</div>
