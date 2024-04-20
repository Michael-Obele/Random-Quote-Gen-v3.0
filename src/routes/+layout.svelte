<script>
  import Footer from '$lib/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import { dynamicColor } from '$lib/store';
  import { ModeWatcher } from 'mode-watcher';

  console.log('dynamicColor = ', $dynamicColor);
</script>

<svelte:head>
  <title>Random Quote</title>
</svelte:head>

<div class="dark">
  <div
    id="main"
    style={`background: linear-gradient( 61deg,
      rgba(3 ,7, 18, 1) 0%,
      ${$dynamicColor} 79%,
      rgba(3 ,7, 18, 1) 100%);`}
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
