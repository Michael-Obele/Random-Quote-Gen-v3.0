<script>
  import '$lib/app.css';
  import Logo from '$lib/components/Logo.svelte';
  import { spring } from 'svelte/motion';
  import { background, counter, DarkColors } from '$lib/store';
  import { page } from '$app/stores';
  import { afterUpdate } from 'svelte';
  import { navBarItems } from './navBarItems';

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

  let isMenu = false;
  const openMenu = () => {
    isMenu = !isMenu;
  };
</script>

<!-- Start of Nav Bar -->

<nav
  class="fixed left-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900 md:h-[10vh]"
>
  <div
    class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4"
  >
    <a href="/" class="element flex items-center">
      <Logo />
    </a>

    <span
      class="element flex hover:cursor-pointer md:order-3"
      on:keydown={ChangeColor}
      on:click={ChangeColor}
      tabindex="0"
      role="button"
    >
      <i
        class="fa-solid fa-fill-drip fa-2x hover:animate-wiggle"
        style="transform: rotate({$animatedRotation}deg) scale({$animatedScale});"
      />
    </span>

    <div class="flex md:order-2">
      <button
        on:click={openMenu}
        data-collapse-toggle="navbar-sticky"
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
        aria-controls="navbar-sticky"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <i class="fa-solid fa-bars" />
      </button>
    </div>
    <div
      class="w-full items-center justify-between md:order-1 md:flex md:w-auto"
      class:hidden={isMenu}
      id="navbar-sticky"
    >
      <ul
        class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900"
      >
        {#each navBarItems as Item}
          {#if current_url === Item.link}
            <li>
              <a
                href={Item.href}
                class="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
                aria-current="page">{Item.text}</a
              >
            </li>
          {:else}
            <li>
              <a
                href={Item.href}
                class="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                aria-current="page">{Item.text}</a
              >
            </li>
          {/if}
        {/each}
      </ul>
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
