<script>
  import { background, counter, DarkColors } from '$lib/store';
  import { get } from 'svelte/store';
  import { afterUpdate } from 'svelte';

  const value = get(counter);
  afterUpdate(() => {
    console.log(get(counter));
  });

  let setCounter;
  let url = 'https://api.quotable.io/quotes/random';
  let dropState = false;
  let textToCopy = '';
  let Copy = 'Copy';

  let promise = getRandomQuote();

  async function getRandomQuote() {
    const res = await fetch(url);
    let text = await res.json();
    text = text[0];
    const time = new Date().toLocaleTimeString([], {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    textToCopy = `${text.author} - ${text.content}`;
    text.time = time;
    setCounter = Math.floor(Math.random() * DarkColors.length);
    background.set(DarkColors[setCounter]);
    return text;
  }

  function generateQuote() {
    promise = getRandomQuote();
  }

  const dropDown = () => {
    dropState = !dropState;
  };

  function copyToClipboard() {
    Copy = 'Copied';
    navigator.clipboard.writeText(textToCopy);
    setTimeout(() => {
      Copy = 'Copy';
      dropState = false;
    }, 1500);
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
        <!-- Content Loading -->
        <div class="mt-3 text-white animate-pulse">
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
        <div class="mt-3 text-white animate-pulse">
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
        <!-- Button Loading-->
        <div class="text-black text-center mx-auto py-2">
          <button
            class="max-h-[15vh] max-w-[70vw] px-[1vw] text-[5vw] md:text-[3vw] bg-amber-400 rounded-lg cursor-wait"
            >generating
            <i class="fa-solid fa-arrows-rotate fa-spin" />
          </button>
        </div>
      </div>
    </div>
    <!-- End of Loading -->
  {:then text}
    <!-- Loaded -->
    <div
      class=" bg-gray-800 shadow-lg w-[99%] rounded-lg mx-auto my-5 max-w-md md:max-w-[70vw]"
    >
      <!--horizontal margin is just for display-->
      <div class="px-4 py-6">
        <div class="items-center relative">
          <!-- Ellipsis -->
          <span
            on:click={dropDown}
            on:keydown={dropDown}
            tabindex="0"
            class:hidden={dropState}
            role="button"
            class="absolute right-[16vw] md:right-[10vw] hover:cursor-pointer"
          >
            <i class="fa-solid fa-ellipsis" />
          </span>
          <!-- Close Button -->
          <span
            on:click={dropDown}
            on:keydown={dropDown}
            tabindex="0"
            class:hidden={!dropState}
            role="button"
            class="absolute right-[16vw] md:right-[10vw] hover:cursor-pointer"
          >
            <i class="fa-solid fa-xmark" />
          </span>
          <!-- Drop Down -->
          <div
            id="dropdown"
            class:hidden={!dropState}
            class="z-10 absolute hidden right-[21vw] md:right-[12vw] text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul class="py-2" aria-labelledby="dropdownButton">
              <li>
                <span
                  on:click={copyToClipboard}
                  on:keydown={copyToClipboard}
                  tabindex="0"
                  role="button"
                  class="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >{Copy}</span
                >
              </li>
              <!-- <li>
                <span
                  on:click={copyToClipboard}
                  on:keydown={copyToClipboard}
                  tabindex="0"
                  role="button"
                  class="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >Share</span
                >
              </li> -->
            </ul>
          </div>
          <!-- Content Loaded -->
          <h2 id="author" class="text-lg font-semibold py-7 text-white -mt-1">
            {text.author}
          </h2>
          <small class="absolute top-0 right-0 text-sm text-white"
            >{text.time}</small
          >
        </div>
        <p class="text-white">Tag: {text.tags}</p>
        <p class="py-5 md:py-7 text-white text-[4vw] md:text-[3vw]">
          {text.content}
        </p>
        <!-- End of Loaded Content -->
        <!-- Button -->
        <div class="text-black text-center mx-auto py-2">
          <button
            on:click={generateQuote}
            class="max-h-[15vh] max-w-[70vw] px-[1vw] text-[5vw] md:text-[3vw] bg-amber-400 rounded-lg"
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

<!-- CSS -->
<style>
  #author {
    font-size: clamp(32px, 3vw, 80px);
  }
</style>
