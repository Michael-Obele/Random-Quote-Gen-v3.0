<script>
  import { background } from '../store';
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

  function generateQuote() {
    promise = getRandomQuote();
  }
</script>

<!-- Html Part -->
<div
  id="Random-Quote"
  class="py-[30vh] max-h-max"
  style="background-color:{$background}"
>
  {#await promise}
    <!-- Loading -->
    <div
      class=" bg-gray-800 shadow-lg w-[98vw] rounded-lg mx-auto my-5 md:w-[70vw] h-fit"
    >
      <div class="px-4 py-6">
        <div class="items-center relative">
          <div
            class="animate-pulse absolute p-2 top-0 right-0 text-sm text-white"
          >
            <div
              id="author"
              class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-[12vw]"
            />
          </div>
          <div class="mt-3 text-white animate-pulse">
            <div
              class="h-[3vw] bg-gray-200 rounded-full dark:bg-gray-700 w-52 mb-4"
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
        <!-- Content -->
        <div id="content" class="mt-3 text-white animate-pulse">
          <div class="flex space-x-4 md:max-w-[90%]">
            <div
              class="h-[2.5vw] bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-4"
            />
            <div
              class="h-[2.5vw] bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-4"
            />
            <div
              class="h-[2.5vw] bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-4"
            />
          </div>
        </div>
        <div id="content" class="mt-3 text-white animate-pulse">
          <div class="flex space-x-5 md:max-w-[90%]">
            <div
              class="h-[2.5vw] bg-gray-200 rounded-full dark:bg-gray-700 w-80 mb-4"
            />
            <div
              class="h-[2.5vw] bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"
            />
            <div
              class="h-[2.5vw] bg-gray-200 rounded-full dark:bg-gray-700 w-80 mb-4"
            />
          </div>
        </div>
        <!-- Button -->
        <div class="generate text-black text-center mx-auto py-2">
          <button
            class="max-h-[15vh] max-w-[90%] text-[2vw] px-[1vw] bg-amber-400 rounded-lg"
            >generating
            <i class="fa-solid fa-arrows-rotate fa-spin" />
          </button>
        </div>
      </div>
    </div>
  {:then text}
    <!-- Loaded -->
    <div
      class=" bg-gray-800 shadow-lg w-[99%] rounded-lg mx-auto my-5 max-w-md md:max-w-[70vw]"
    >
      <!--horizontal margin is just for display-->
      <div class="px-4 py-6">
        <div class="items-center relative">
          <h2 id="author" class="text-lg font-semibold py-7 text-white -mt-1">
            {text.author}
          </h2>
          <small class="absolute top-0 right-0 text-sm text-white"
            >{text.time}</small
          >
        </div>
        <p class="text-white">Tag: {text.tags}</p>
        <p id="content" class="py-7 mt-3 text-white text-md">
          {text.content}
        </p>
        <!-- Button -->
        <div class="generate text-black text-center mx-auto py-2">
          <button
            on:click={generateQuote}
            class="max-h-[15vh] max-w-[90%] text-[2vw] px-[1vw] bg-amber-400 rounded-lg"
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

<!-- Test -->

<style>
  .generate * {
    border: red 2px solid;
  }
  #author {
    font-size: clamp(32px, 3vw, 80px);
  }

  #content {
    font-size: clamp(12px, 2.4vw, 60px);
  }
</style>
