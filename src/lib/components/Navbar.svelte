<script lang="ts">
  import Search from './Search.svelte';

  import '$lib/app.css';
  import Logo from '$lib/logos/logo.svelte';
  import { spring } from 'svelte/motion';
  import { background, counter, DarkColors } from '$lib/store';
  import { page } from '$app/stores';
  import { afterUpdate } from 'svelte';

  let isAnimated = false;
  let rotation = 0;
  let scale = 1;
  let current_url = $page.url.href.split('/').pop();
  $: setCounter = 0;

  export function ChangeColor() {
    setCounter = Math.floor(Math.random() * DarkColors.length);
    counter.set(setCounter);
    isAnimated = true;
    rotation = 45;
    scale = 1.2;

    // Reset the animation after a delay
    setTimeout(() => {
      background.set(DarkColors[setCounter]);
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
  class="fixed left-0 top-0 h-fit w-full border-b dark:border-gray-600 dark:bg-gray-900"
>
  <div
    class="relative mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4"
  >
    <a href="/" class="element flex items-center">
      <Logo />
    </a>

    <a
      href="/Search"
      class:actives={$page.url.pathname === '/Search'}
      class="group hidden items-center px-20 text-2xl text-white md:flex"
    >
      Search <i
        class="fa-solid fa-magnifying-glass px-2 opacity-40 group-hover:opacity-100"
      />
    </a>

    <span
      class="element flex hover:cursor-pointer md:order-3"
      on:keydown={ChangeColor}
      on:click={ChangeColor}
      tabindex="0"
      role="button"
    >
      <i
        class="fa-solid fa-fill-drip fa-2x text-white hover:animate-wiggle"
        style="transform: rotate({$animatedRotation}deg) scale({$animatedScale});"
      />
    </span>

    <div class="flex md:order-2">
      <a
        href="/Search"
        class:actives={$page.url.pathname === '/Search'}
        class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
      >
        <i class="fa-solid fa-magnifying-glass fa-2x" />
      </a>
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
  .actives {
    background-color: white;
    padding: 0 2rem;
    border-radius: 0.5rem;
    color: black;
  }

  .actives:hover {
    color: black;
    background-color: white;
  }
</style>
