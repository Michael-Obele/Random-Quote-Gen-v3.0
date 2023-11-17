<script>
  import { onMount } from 'svelte';
  /**
   * @type {{ author: any; time: any; tags: any; content: any; }}
   */
  export let text;

  let quoteText = '';

  /**
   * @param {string} word
   */
  function typeText(word) {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= word.length) {
        quoteText = word.substring(0, index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust the interval to control the typing speed
  }

  onMount(() => {
    typeText(text.content);
  });

  let dropState = false;
  export let textToCopy = '';
  let Copy = 'Copy';

  /**
   * @type {any}
   */
  export let generateQuote;

  async function getQuote() {
    await generateQuote();
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

<div
  class="relative mx-auto my-5 w-[99%] max-w-md rounded-lg bg-gray-800 shadow-lg md:max-w-[70vw]">
  <!-- random btn -->
  <button
    on:click={getQuote}
    class="group absolute right-8 top-2 flex cursor-pointer text-lg font-semibold hover:scale-110">
    random
    <i
      class="fa-solid fa-arrows-spin m-1 ml-2 h-5 w-5 stroke-2 group-hover:animate-spin-once" />
  </button>
  <!-- End of random btn -->
  <!-- other buttons -->
  <!-- Ellipsis -->
  <span
    on:click={dropDown}
    on:keydown={dropDown}
    tabindex="0"
    class:hidden={dropState}
    role="button"
    class="absolute right-2 top-2 hover:cursor-pointer">
    <i class="fa-solid fa-ellipsis" />
  </span>
  <!-- Close Button -->
  <span
    on:click={dropDown}
    on:keydown={dropDown}
    tabindex="0"
    class:hidden={!dropState}
    role="button"
    class="absolute right-2 top-2 hover:cursor-pointer">
    <i class="fa-solid fa-xmark hover:animate-wiggle" />
  </span>
  <!-- Drop Down -->
  <div
    id="dropdown"
    class:hidden={!dropState}
    class="absolute right-6 top-1 z-10 hidden w-44 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:bg-gray-700">
    <ul class="py-2" aria-labelledby="dropdownButton">
      <li>
        <span
          on:click={copyToClipboard}
          on:keydown={copyToClipboard}
          tabindex="0"
          role="button"
          class="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >{Copy}</span>
      </li>
    </ul>
  </div>
  <!-- End of other buttons -->
  <!-- The Main content -->
  <blockquote
    class="my-4 mt-36 rounded-sm border-s-[10px] border-gray-300 bg-gray-50 p-4 dark:border-gray-500 dark:bg-gray-800">
    <p
      class="py-10 text-xl font-medium italic leading-relaxed text-gray-900 dark:text-white md:text-2xl">
      " {quoteText} "
    </p>
  </blockquote>
  <!-- End of The Main content -->
</div>

<section
  class="absolute bottom-0 z-50 flex h-[25vh] w-full flex-col bg-slate-200 p-12 px-[10rem] dark:bg-gray-800">
  <h3 class="text-lg font-bold capitalize text-white md:text-2xl">
    {text.author}
  </h3>
  <p class="text-sm font-semibold uppercase text-gray-400 md:text-lg">
    {text.tags}
  </p>
</section>
