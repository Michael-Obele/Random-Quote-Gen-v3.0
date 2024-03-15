<script lang="ts">
  import { background, DarkColors } from '$lib/store';

  let selectedButton = 'Button 1';
  let activeButton = '';

  let value: any[] = [];
  $: textLoad = '';
  $: more = '';

  let showModal = false;
  let setCounter;
  let searchBy;
  let searchText = '';
  let searchType = 'Author';

  type SearchItem = {
    [key: string]: string; // Index signature allowing any string key with string values
  };

  const searchItems: Record<string, SearchItem> = {
    Author: {
      icon: 'fa-solid fa-user ml-2',
      info: 'Enter the exact author name.',
    },
    Tag: {
      icon: 'fa-solid fa-tag',
      info: 'Use commas to separate multiple tags (e.g., tag1, tag2).',
    },
    Text: {
      icon: 'fa-solid fa-font',
      info: 'Type a single word or phrase to search.',
    },
  };

  async function searchQuote(text: string, type: string) {
    let url;
    if (type !== 'Text') {
      url = `https://api.quotable.io/${
        type === 'Tag' ? 'quotes?tags' : 'quotes?author'
      }=${text}&limit=100`;
      console.log(url);
    } else
      url =
        'https://api.quotable.io/search/quotes?query=' + text + '&limit=100';
    -console.log(url);
    const res = await fetch(url);
    const result = await res.json();
    value = result.results;
    textLoad = result.count === 0 ? 'No Result' : '';
    more =
      result.totalCount > result.count ? 'The is the first 100 results.' : '';
    setCounter = Math.floor(Math.random() * DarkColors.length);
    background.set(DarkColors[setCounter]);
    console.log(result);
    return result;
  }

  function search() {
    value = [];
    textLoad = 'Please Wait...';
    more = '';
    searchBy = searchQuote(searchText, searchType);
  }
</script>

<!-- Html Part -->
<div class="h-fit min-h-screen pb-5">
  <h1
    class="mb-6 text-center text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl"
  >
    Generate Quote By Searching...
  </h1>

  <div class="">
    <ul
      class="mx-auto mb-12 grid w-1/2 gap-6 md:w-full md:grid-cols-3 md:px-20 lg:px-36"
    >
      {#each ['Author', 'Text', 'Tag'] as item (item)}
        <li>
          <input
            type="radio"
            id={item}
            name="hosting"
            bind:group={searchType}
            value={item}
            class="peer hidden"
            required
          />
          <label
            for={item}
            class="inline-flex w-full cursor-pointer items-center justify-around rounded-full border border-gray-200 bg-white py-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500 lg:rounded-full lg:px-12"
          >
            <div class="block">
              <div class="mr-3 w-full text-lg font-semibold">
                <span class="group relative">
                  <i class="fa-solid fa-circle-info pr-2" />
                  <div
                    id="tooltip-default"
                    role="tooltip"
                    class="tooltip absolute -right-4 bottom-8 z-10 inline-block w-32 rounded-lg bg-black px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100"
                  >
                    {searchItems[item].info}
                  </div>
                </span>
                {item}
              </div>
              <div class="hidden w-full xl:block">
                Search By {item}
              </div>
            </div>
            <i class={searchItems[item].icon} />
          </label>
        </li>
      {/each}
    </ul>

    <!-- Form -->

    <form class="mx-auto w-[90vw] md:w-[60vw]">
      <label
        for="search"
        class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <i class="fa-solid fa-magnifying-glass px-1 text-gray-400" />
        </div>
        <input
          type="search"
          id="search-text"
          bind:value={searchText}
          class="block h-[4rem] w-full rounded-full border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Search For Quotes..."
          required
        />
        <button
          type="submit"
          on:click={search}
          class="absolute bottom-3.5 right-3.5 rounded-3xl bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >Search</button
        >
      </div>
    </form>
  </div>
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

<div
  class:hidden={!showModal}
  class="relative z-10"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
>
  <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div
      class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
    >
      <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
      <div
        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
      >
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div
              class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
            >
              <svg
                class="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3
                class="text-base font-semibold leading-6 text-gray-900"
                id="modal-title"
              >
                Deactivate account
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Are you sure you want to deactivate your account? All of your
                  data will be permanently removed. This action cannot be
                  undone.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            >Deactivate</button
          >
          <button
            type="button"
            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >Cancel</button
          >
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
  }

  .tooltip-arrow[data-popper-placement^='top'] {
    border-width: 5px 5px 0 5px;
    border-color: transparent transparent transparent #000; /* Adjust for desired color */
    bottom: -5px;
    left: calc(50% - 5px);
  }
</style>
