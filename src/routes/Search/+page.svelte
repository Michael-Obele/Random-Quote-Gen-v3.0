<script lang="ts">
  import { background, DarkColors } from '$lib/store';

  let selectedButton = 'Button 1';
  let activeButton = '';

  let value: any[] = [];
  $: textLoad = '';
  $: more = '';

  let setCounter;
  let searchBy;
  let searchText = '';
  let searchType = 'Author';

  type SearchItem = {
    [key: string]: string; // Index signature allowing any string key with string values
  };

  const searchItems: Record<string, SearchItem> = {
    Author: {
      icon: 'fa-solid fa-user',
    },
    Tag: {
      icon: 'fa-solid fa-tag',
    },
    Text: {
      icon: 'fa-solid fa-font',
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

  function handleClick(event: any) {
    activeButton = event.target.value;
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
    <ul class="mx-auto mb-12 grid w-fit gap-6 sm:grid-cols-3 md:w-full md:px-6">
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
            class="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
          >
            <div class="block">
              <div class="mr-3 w-full text-lg font-semibold">
                {item}
              </div>
              <div class="hidden w-full md:block">Search By {item}</div>
            </div>
            <i class={searchItems[item].icon} />
          </label>
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

<!-- Test code -->
<!-- <div>
  <button
    value="Button 1"
    class={activeButton === 'Button 1' ? 'active' : ''}
    on:click={handleClick}>Button 1</button
  >
  <button
    value="Button 2"
    class={activeButton === 'Button 2' ? 'active' : ''}
    on:click={handleClick}>Button 2</button
  >
  <button
    value="Button 3"
    class={activeButton === 'Button 3' ? 'active' : ''}
    on:click={handleClick}>Button 3</button
  >
</div>

<p>Selected Button: {activeButton}</p>

<style>
  .active {
    background-color: #4caf50;
    color: white;
  }
</style> -->
