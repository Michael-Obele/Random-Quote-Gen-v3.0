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
    style={`background: linear-gradient( 51deg,
      rgba(3 ,7, 18, 1) 22%,
      ${$dynamicColor} 73%,
      rgba(3 ,7, 18, 1) 100%);`}
    class="relative max-h-fit min-h-screen bg-slate-500 pt-[10rem] align-middle transition delay-150 ease-linear dark:bg-gray-950 dark:text-white"
  >
    <Navbar />
    <div class="container mx-auto min-h-screen pb-52">
      <ModeWatcher />
      <slot />
    </div>
    <Footer />
  </div>
</div>
