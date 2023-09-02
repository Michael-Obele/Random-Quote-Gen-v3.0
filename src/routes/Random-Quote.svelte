<script>
  import { colors } from '../store';
  let url = 'https://api.quotable.io/random';

  let promise = getRandomQuote();

  async function getRandomQuote() {
    const res = await fetch(url);
    const text = await res.json();
    const time = new Date().toLocaleTimeString([], {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    text.time = time;
    return text;
  }

  function handleClick() {
    promise = getRandomQuote();
  }
</script>

<!-- Html Part -->
<div id="Random-Quote" class="pt-[30vh] h-screen">
  <button />

  {#await promise}
    <!-- Loading -->
    <div
      class=" bg-gray-800 shadow-lg w-[99%] rounded-lg mx-auto my-5 max-w-md md:max-w-2xl"
    >
      <div class="px-4 py-6">
        <div class="items-center relative">
          <div class="animate-pulse absolute p-2 right-0 text-sm text-white">
            <div
              class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-[12vw]"
            />
          </div>
          <div class="mt-3 text-white animate-pulse">
            <div
              class="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-52 mb-4"
            />
          </div>
        </div>
        <div class="flex animate-pulse space-x-4 w-2/12 md:max-w-[21rem]">
          <div
            class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10 mb-4"
          />
          <div
            class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"
          />
        </div>
        <div class="mt-3 text-white animate-pulse">
          <div class="flex space-x-4 w-5/6 md:max-w-[21rem]">
            <div
              class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-4"
            />
            <div
              class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-4"
            />
          </div>
        </div>
        <div class="text-black text-center mx-auto py-2">
          <button class=" bg-amber-400 w-2/4 rounded-lg"
            >generating
            <i class="fa-solid fa-arrows-rotate fa-spin" />
          </button>
        </div>
      </div>
    </div>
  {:then text}
    <!-- Loaded -->
    <div
      class=" bg-gray-800 shadow-lg rounded-lg mx-auto my-5 max-w-md md:max-w-2xl"
    >
      <!--horizontal margin is just for display-->
      <div class="px-4 py-6">
        <div class="items-center relative">
          <h2 class="text-lg font-semibold text-white -mt-1">
            {text.author}
          </h2>
          <small class=" absolute right-0 text-sm text-white">{text.time}</small
          >
        </div>
        <p class="text-white">Tag: {text.tags}</p>
        <p class="mt-3 text-white text-sm">
          {text.content}
        </p>
        <div class="text-black text-center mx-auto py-2">
          <button on:click={handleClick} class=" bg-amber-400 w-2/4 rounded-lg"
            >generate random quote
            <i class="fa-solid fa-arrows-rotate" />
          </button>
        </div>
      </div>
    </div>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>
