<script>
  import '../app.css';
  import Logo from '../Logo.svelte';
  import { spring } from 'svelte/motion';
  import { background, colors, LightColors, DarkColors } from '../store';
  import { page } from '$app/stores';
  import { afterUpdate } from 'svelte';

  let isAnimated = false;
  let rotation = 0;
  let scale = 1;

  let counter = 0;

  function ChangeColor() {
    counter = (counter + 1) % colors.length;
    isAnimated = true;
    rotation = 45;
    scale = 1.2;

    // Reset the animation after a delay
    setTimeout(() => {
      background.set(DarkColors[counter]);
      isAnimated = false;
      rotation = 0;
      scale = 1;
    }, 500);
  }

  // Create spring animations
  $: animatedRotation = spring(rotation, { stiffness: 0.1, damping: 0.7 });
  $: animatedScale = spring(scale, { stiffness: 0.1, damping: 0.7 });

  const navBarItems = ['Random-Quote', 'Random-Quotes', 'About'];

  afterUpdate(() => {
    // @ts-ignore
    current_url = $page.url.href.split('/').pop();
    console.log('current_url = ', current_url);
  });
  let current_url = $page.url.pathname;

  let isMenu = false;
  const openMenu = () => {
    isMenu = !isMenu;
  };
</script>

<!-- Start of Nav Bar -->

<nav
  class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600"
>
  <div
    class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
  >
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a href="#" class="flex items-center">
      <Logo />
    </a>

    <span
      class="flex md:order-3 hover:cursor-pointer"
      on:keydown={ChangeColor}
      on:click={ChangeColor}
      tabindex="0"
      role="button"
    >
      <i
        class="fa-solid fa-fill-drip fa-2x"
        style="transform: rotate({$animatedRotation}deg) scale({$animatedScale});"
      />
    </span>

    <div class="flex md:order-2">
      <button
        on:click={openMenu}
        data-collapse-toggle="navbar-sticky"
        type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-sticky"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <i class="fa-solid fa-bars" />
      </button>
    </div>
    <div
      class="items-center justify-between w-full md:flex md:w-auto md:order-1"
      class:hidden={isMenu}
      id="navbar-sticky"
    >
      <ul
        class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
      >
        {#each navBarItems as navItem}
          {#if navItem === 'About'}
            {#if current_url === 'About'}
              <li>
                <a
                  href="/About"
                  class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page">About</a
                >
              </li>
            {:else}
              <li>
                <a
                  href="/About"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page">About</a
                >
              </li>
            {/if}
          {:else if current_url === '#' + navItem}
            <li>
              <a
                href="/#{navItem}"
                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page">{navItem}</a
              >
            </li>
          {:else}
            <li>
              <a
                href="/#{navItem}"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page">{navItem}</a
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
</style>
