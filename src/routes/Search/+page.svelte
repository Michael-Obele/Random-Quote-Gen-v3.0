<script>
  import { afterUpdate } from 'svelte';
  import { background, DarkColors } from '$lib/store';

  /**
   * @type {any[]}
   */
  $: value = [];
  $: textLoad = '';
  $: more = '';

  $: number = 3;
  let setCounter;
  let searchBy;
  let searchText = '';
  let searchType = 'Author';

  let promise = getRandomQuote(number);

  /**
   * @param {number} num
   */
  async function getRandomQuote(num) {
    let url = 'https://api.quotable.io/quotes/random?limit=' + num;
    const res = await fetch(url);
    const text = await res.json();
    return text;
  }

  /**
   * @param {string} text
   * @param {string} type
   */
  async function searchQuote(text, type) {
    let url;
    switch (type) {
      case 'Tag(s)':
        url = 'https://api.quotable.io/quotes?tags=' + text + '&limit=100';
        console.log(url);
        break;
      case 'Author':
        url = 'https://api.quotable.io/quotes?author=' + text + '&limit=100';
        break;
      case 'Text':
        url =
          'https://api.quotable.io/search/quotes?query=' + text + '&limit=100';
        console.log(url);
        break;
      default:
        break;
    }
    if (url) {
      const res = await fetch(url);
      const result = await res.json();
      value = result.results;
      textLoad = '';
      if (result.count == 0) {
        textLoad = 'No Result';
      }
      if (result.totalCount > result.count) {
        more = 'More can be loaded...';
      }
      setCounter = Math.floor(Math.random() * DarkColors.length);
      background.set(DarkColors[setCounter]);
      url = '';
      console.log(result);
      return result;
    }
  }

  function handleClick() {
    if (number > 0) {
      promise = getRandomQuote(number);
    } else {
      alert('Enter a number greater than or equal to 1');
    }
  }
  function search() {
    value = [];
    textLoad = 'Please Wait...';
    more = '';
    searchBy = searchQuote(searchText, searchType);
  }
</script>

<!-- Html Part -->
<div class="h-fit min-h-screen pb-5 pt-[15vh]">
  <!-- Hidden -->
  <div class="hidden pt-[20vh]">
    <h1>Generate Quote By Number</h1>
    <button class="rounded-md bg-slate-600 text-white" on:click={handleClick}>
      {number > 1
        ? `generate ${number} random quotes`
        : `generate ${number} random quote`}
    </button>
    <input
      class="bg-slate-400 text-white"
      type="number"
      name="quoteLimit"
      min="1"
      max="20"
      bind:value={number}
    />

    {#await promise}
      <p>...waiting</p>
    {:then texts}
      {#each texts as text}
        <div class="max-w-500px p-5">
          <blockquote class="m-0 px-10 text-base">
            <p>{text.content}</p>
            <cite class="mt-1 text-sm italic">- {text.author}</cite>
          </blockquote>
        </div>
      {/each}
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
    <hr class="h-1 w-full" />
  </div>
  <!-- End of Hidden -->

  <h1 class="mb-4 text-center font-semibold text-gray-900 dark:text-white">
    Generate Quote By Searching...
  </h1>

  <h3 class="mb-4 text-center font-semibold text-gray-900 dark:text-white">
    Search By:
  </h3>
  <ul
    class="mx-auto w-[90vw] items-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:flex md:w-[70vw]"
  >
    {#each ['Author', 'Text', 'Tag(s)'] as item}
      <li
        class="w-full border-b border-gray-200 dark:border-gray-600 sm:border-b-0 sm:border-r"
      >
        <div class="flex items-center pl-3">
          <input
            id={item}
            type="radio"
            value={item}
            bind:group={searchType}
            name="search"
            class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
          />
          <label
            for={item}
            class="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >{item}
          </label>
        </div>
      </li>
    {/each}
  </ul>

  <!-- Form -->

  <form class="mx-auto w-[90vw] md:w-[70vw]">
    <label
      for="search"
      class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >Search</label
    >
    <div class="relative">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
      >
        <svg
          class="h-4 w-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        id="search-text"
        bind:value={searchText}
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Search For Quotes..."
        required
      />
      <button
        type="submit"
        on:click={search}
        class="absolute bottom-2.5 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Search</button
      >
    </div>
  </form>
  <!-- Loading -->
  {#if textLoad}
    <ul
      class="mx-auto w-[90vw] rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white md:w-[70vw]"
    >
      <li
        class="w-full border-b border-gray-200 px-4 py-2 hover:bg-gray-100 hover:text-blue-700 dark:border-gray-600"
      >
        <h1>{textLoad}</h1>
      </li>
    </ul>
  {/if}
  <!-- Result -->
  {#if value.length}
    <ul
      class="mx-auto w-[90vw] rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white md:w-[70vw]"
    >
      {#each value as val}
        <li
          class="w-full border-b border-gray-200 px-4 py-2 hover:bg-gray-100 hover:text-blue-700 dark:border-gray-600"
        >
          <h1>{val.author}</h1>
          <cite>({val.tags})</cite>
          <p>- {val.content}</p>
        </li>
      {/each}
      {#if more}
        <li
          class="w-full border-b border-gray-200 px-4 py-2 hover:bg-gray-100 hover:text-blue-700 dark:border-gray-600"
        >
          {more}
        </li>
      {/if}
    </ul>
  {/if}
</div>
