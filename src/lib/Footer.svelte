<script>
  import { page } from '$app/stores';
</script>

<footer
  class="absolute bottom-0 z-20 flex w-full flex-row justify-between bg-gray-800 py-5"
>
  <span />
  <h3 class="font-bold capitalize text-white">
    Made with <img
      class="mx-2 inline h-5 w-5"
      src="https://www.svgrepo.com/show/501921/love.svg"
      alt="love from svgrepo"
    /> from Michael
  </h3>

  <a
    href="/About"
    class:hidden={$page.url.pathname === '/About'}
    class="group mx-3 inline-flex items-center text-2xl text-white md:order-none"
  >
    <span class="hidden md:inline"> About </span>
    <i
      class="fa-solid fa-circle-info px-2 opacity-100 md:opacity-40 md:group-hover:opacity-100"
    />
  </a>
  <!-- Active About -->
  <a
    href="/About"
    class:inline-flex={$page.url.pathname === '/About'}
    class:hidden={$page.url.pathname !== '/About'}
    class="group mx-3 hidden items-center rounded-lg bg-white text-2xl text-black md:order-none"
  >
    <span class="hidden px-4 md:inline"> About </span>
    <i
      class="fa-solid fa-circle-info p-2 opacity-100 md:opacity-40 md:group-hover:opacity-100"
    />
  </a>
  <!-- End of Active About -->
</footer>
