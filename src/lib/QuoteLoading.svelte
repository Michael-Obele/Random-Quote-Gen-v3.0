<script>
   import { onMount, onDestroy } from 'svelte';
  import { afterUpdate } from 'svelte';
 
   let text = 'Loading...';
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
        index = 0; // Reset the index to start over
      }
    }, 100); // Adjust the interval to control the typing speed

    onDestroy(() => {
      clearInterval(interval); // Clear the interval when the component is destroyed
    });
  }

  onMount(() => {
    typeText(text);
  });


 
</script>


<div
  class="relative mx-auto my-5 w-[99%] max-w-md rounded-lg bg-gray-800 shadow-lg md:max-w-[70vw]"
>
  <!-- random btn -->
  <button
    class="group absolute right-8 top-2 flex cursor-pointer text-lg font-semibold hover:scale-110"
  >
    random
    <i class="fa-solid fa-arrows-spin m-1 ml-2 h-5 w-5 animate-spin stroke-2"></i>
  
  </button>
  <!-- End of random btn -->
<blockquote
    class="my-4 border-s-4 border-gray-300 bg-gray-50 p-4 dark:border-gray-500 dark:bg-gray-800"
  >
    <p
      class="py-10 text-xl font-medium italic leading-relaxed text-gray-900 dark:text-white md:text-2xl"
    >
      " {quoteText} "
    </p>
  </blockquote>
</div>


<section class="absolute bottom-0 z-50 flex h-[25vh] w-full flex-col bg-slate-200 p-12 px-[10rem] dark:bg-slate-700">
  {#if text}
  <h3 class="text-lg font-bold capitalize text-white md:text-2xl">{text}</h3>
  <p class="text-sm font-semibold uppercase text-gray-400 md:text-lg">{text}</p>
{/if}
</section> 