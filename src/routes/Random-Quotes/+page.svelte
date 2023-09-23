<script>
  import { afterUpdate } from 'svelte';
  import { searchContent } from '$lib/store';
  import { get } from 'svelte/store';

  /**
   * @type {any[]}
   */
  $: value = [];
  $: textLoad = '';

  afterUpdate(() => {});

  $: number = 3;
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
        break;
      case 'Author':
        url = 'https://api.quotable.io/quotes?author=' + text + '&limit=100';
        break;
      case 'Quote':
        url =
          'https://api.quotable.io/search/quotes?query=' +
          text +
          '&fields=content&limit=100';
        break;
      default:
        break;
    }
    if (url) {
      const res = await fetch(url);
      const result = await res.json();
      value = result.results;
      if (result.totalPages > 1) {
      }
      textLoad = '';
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
    searchBy = searchQuote(searchText, searchType);
  }
</script>

<!-- Html Part -->
<div class="pt-[20vh]">
  <h1>Generate Quote By Number</h1>
  <button class="bg-slate-600 rounded-md text-white" on:click={handleClick}>
    {number > 1
      ? `generate ${number} random quotes`
      : `generate ${number} random quote`}
  </button>
  <input
    class=" bg-slate-400 text-white"
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
          <cite class=" text-sm italic mt-1">- {text.author}</cite>
        </blockquote>
      </div>
    {/each}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>

<hr class=" h-1 w-full" />
<h1>Generate Quote By Searching Text</h1>

<h3 class=" text-center mb-4 font-semibold text-gray-900 dark:text-white">
  Search By:
</h3>
<ul
  class="w-[90vw] md:w-[70vw] mx-auto items-center text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
>
  {#each ['Author', 'Text', 'Tag(s)'] as item}
    <li
      class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
    >
      <div class="flex items-center pl-3">
        <input
          id={item}
          type="radio"
          value={item}
          bind:group={searchType}
          name="search"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
        />
        <label
          for={item}
          class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >{item}
        </label>
      </div>
    </li>
  {/each}
</ul>

<!-- Form -->

<form class=" w-[90vw] md:w-[70vw] mx-auto">
  <label
    for="search"
    class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
    >Search</label
  >
  <div class="relative">
    <div
      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
    >
      <svg
        class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
      class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search For Quotes..."
      required
    />
    <button
      type="submit"
      on:click={search}
      class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >Search</button
    >
  </div>
</form>
<!-- Loading -->
{#if textLoad}
  <ul
    class=" w-[90vw] md:w-[70vw] mx-auto text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
  >
    <li
      class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 hover:text-blue-700"
    >
      <h1>{textLoad}</h1>
    </li>
  </ul>
{/if}
<!-- Result -->
{#if value.length}
  <ul
    class=" w-[90vw] md:w-[70vw] mx-auto text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
  >
    {#each value as val}
      <li
        class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 hover:text-blue-700"
      >
        <h1>{val.author}</h1>
        <cite>({val.tags})</cite>
        <p>- {val.content}</p>
      </li>
    {/each}
  </ul>
{/if}
