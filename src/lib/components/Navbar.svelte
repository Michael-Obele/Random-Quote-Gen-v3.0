<script lang="ts">
  import '$lib/app.css';
  import { Sun, Moon } from 'lucide-svelte';
  import { toggleMode } from 'mode-watcher';
  import { Button } from '$lib/components/ui/button/index.js';
  import Logo from '$lib/logos/logo.svelte';
  import { spring } from 'svelte/motion';
  import { dynamicColor, counter, darkTextColors } from '$lib/store';
  import { page } from '$app/stores';
  import { afterUpdate } from 'svelte';

  let isAnimated = false;
  let rotation = 0;
  let scale = 1;
  let current_url = $page.url.href.split('/').pop();
  $: setCounter = 0;

  export function ChangeColor() {
    setCounter = Math.floor(Math.random() * darkTextColors.length);
    counter.set(setCounter);
    isAnimated = true;
    rotation = 45;
    scale = 1.2;

    // Reset the animation after a delay
    setTimeout(() => {
      dynamicColor.set(darkTextColors[setCounter]);
      isAnimated = false;
      rotation = 0;
      scale = 1;
    }, 500);
  }

  // Create spring animations
  $: animatedRotation = spring(rotation, { stiffness: 0.1, damping: 0.7 });
  $: animatedScale = spring(scale, { stiffness: 0.1, damping: 0.7 });

  afterUpdate(() => {
    current_url = $page.url.href.split('/').pop();
  });
</script>

<!-- Start of Nav Bar -->
<nav
  class="fixed left-0 top-0 z-50 h-fit w-full border-b bg-gray-400 dark:border-gray-600 dark:bg-gray-900"
>
  <div
    class="relative mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4"
  >
    <a href="/" class="element flex items-center">
      <Logo />
    </a>

    <a
      href="/Search"
      class:hidden={$page.url.pathname === '/Search'}
      class="group order-last inline-flex items-center text-2xl text-white md:order-none"
    >
      <span class="hidden md:inline"> Search </span>
      <i
        class="fa-solid fa-magnifying-glass px-2 opacity-100 md:opacity-40 md:group-hover:opacity-100"
      />
    </a>
    <!-- Active Search -->
    <a
      href="/Search"
      class:inline-flex={$page.url.pathname === '/Search'}
      class:hidden={$page.url.pathname !== '/Search'}
      class="group order-last hidden items-center rounded-lg bg-white text-2xl text-black md:order-none"
    >
      <span class="hidden px-4 md:inline"> Search </span>
      <i
        class="fa-solid fa-magnifying-glass p-2 opacity-100 md:opacity-40 md:group-hover:opacity-100"
      />
    </a>
    <!-- End of Active Search -->

    <div class="flex space-x-5">
      <!-- Dark Mode Btn -->
      <!-- <Button on:click={toggleMode} variant="outline" size="icon">
        <Sun
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Moon
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button> -->
      <!-- End of Dark Mode Btn -->

      <span
        class="element flex hover:cursor-pointer md:order-3"
        on:keydown={ChangeColor}
        on:click={ChangeColor}
        tabindex="0"
        role="button"
      >
        <i
          class="fa-solid fa-fill-drip fa-2x md:hover:animate-wiggle text-white"
          style="transform: rotate({$animatedRotation}deg) scale({$animatedScale});"
        />
      </span>
    </div>
  </div>
</nav>

<!-- End of Nav Bar -->

<style>
  .fa-fill-drip {
    transition: transform 0.5s cubic-bezier(0.42, 0, 0.58, 1);
    transform-origin: bottom;
  }
  .element:focus,
  .element:active,
  .element:hover {
    text-decoration: none;
    background-color: rgb(17 24 39 / var(--tw-bg-opacity));
    -webkit-tap-highlight-color: transparent !important;
  }
</style>
