<script>
  import Footer from "$lib/Footer.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import { dynamicColor } from "$lib/store";
  import { ModeWatcher } from "mode-watcher";
  import { Toaster } from "$lib/components/ui/sonner";
</script>

<svelte:head>
  <title>Random Quote Generator</title>
  <meta
    name="description"
    content="Generate random, inspiring quotes with this simple web app."
  />
  <meta
    name="keywords"
    content="random quote, quote generator, inspiration, motivation"
  />
</svelte:head>

<Toaster />
<ModeWatcher />

<div class="dark">
  <div
    style={`background: linear-gradient( 51deg,
      rgba(3 ,7, 18, 1) 22%,
      ${$dynamicColor} 73%,
      rgba(3 ,7, 18, 1) 100%);`}
    class="relative max-h-fit min-h-screen bg-slate-500 pt-[10rem] align-middle transition delay-150 duration-500 ease-linear dark:bg-gray-950 dark:text-white"
  >
    <Navbar />
    <div class="container mx-auto min-h-screen pb-52">
      <slot />
    </div>
    <Footer />
  </div>
</div>
