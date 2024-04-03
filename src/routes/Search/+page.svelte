<script lang="ts">
  import Modal from './Modal.svelte';
  import { dynamicColor } from '$lib/store';

  let value: any[] = [];
  $: textLoad = '';
  $: more = '';
  let showModal = false;
  let searchBy;
  let searchText = '';
  let searchType = 'Text';

  type Quote = {
    author: string;
    content: string;
    tags: string[];
  };

  let selectedValue: Quote;

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
    } else
      url =
        'https://api.quotable.io/search/quotes?query=' + text + '&limit=100';
    const res = await fetch(url);
    const result = await res.json();
    value = result.results;
    textLoad = result.count === 0 ? 'No Result' : '';
    more =
      result.totalCount > result.count ? 'The is the first 100 results.' : '';
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
            class="inline-flex w-full cursor-pointer items-center justify-around rounded-3xl border border-gray-200 bg-white py-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500 lg:rounded-3xl lg:px-12"
          >
            <div class="block">
              <div class="mr-3 w-full text-lg font-semibold">
                <span class="relative w-3">
                  <i class="fa-solid fa-circle-info group peer pr-2" />
                  <div
                    id="tooltip-default"
                    role="tooltip"
                    class="tooltip absolute -right-4 bottom-8 z-10 inline-block w-32 rounded-lg bg-black px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 peer-hover:opacity-100"
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
          class="block h-[4rem] w-full rounded-3xl border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Search For Quotes..."
          required
        />
        <button
          type="submit"
          on:click={search}
          class="absolute bottom-3.5 right-3.5 rounded-xl bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >Search</button
        >
      </div>
    </form>
  </div>
  <!-- Loading -->
  {#if textLoad}
    <ul
      class="mx-auto mt-5 w-[90vw] rounded-3xl border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white md:w-[60vw]"
    >
      <li class="w-full border-gray-200 px-4 py-2 text-lg dark:border-gray-600">
        <h1>{textLoad}</h1>
      </li>
    </ul>
  {/if}
  <!-- Result -->
  {#if value.length}
    <ul
      class="mx-auto mt-5 w-[90vw] rounded-3xl border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white md:w-[60vw]"
    >
      {#each value as val}
        <li class="w-full border-gray-200 px-4 py-2 dark:border-gray-600">
          <a
            class="text-md after:content-['_↗']"
            href="/{val.author}"
            on:click={() => (window.location.href = `/${val.author}`)}
            >{val.author} <cite>({val.tags})</cite></a
          >
          <p>
            - {val.content}

            <button
              on:click={() => {
                showModal = !showModal;
                selectedValue = val;
              }}
              class="me-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300"
              >View</button
            >
          </p>

          <Modal {selectedValue} {showModal}>
            <span slot="btn">
              <button
                on:click={() => (showModal = false)}
                style="background-color:{$dynamicColor}"
                class="rounded-2xl px-16 py-4 text-lg capitalize text-white md:px-20 md:text-xl"
                >Close</button
              >
            </span>
          </Modal>
        </li>
      {/each}
      {#if more}
        <li class="w-full border-gray-200 px-4 py-2 dark:border-gray-600">
          {more}
        </li>
      {/if}
    </ul>
  {/if}
</div>
