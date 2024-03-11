<script lang="ts">
  import Card from './Card.svelte';

  let searchBy;
  let searchText = '';
  let searchType = 'Author';
  let dropdown = false;

  $: value = [] as any;
  $: textLoad = '';
  $: more = '';

  async function searchQuote(text: string, type: string) {
    let url;
    switch (type) {
      case 'Tag(s)':
        url = 'https://api.quotable.io/quotes?tags=' + text + '&limit=60';
        console.log(url);
        break;
      case 'Author':
        url = 'https://api.quotable.io/quotes?author=' + text + '&limit=60';
        break;
      case 'Text':
        url =
          'https://api.quotable.io/search/quotes?query=' + text + '&limit=60';
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
      url = '';
      console.log(result);
      return result;
    }
  }
  function search() {
    value = [];
    textLoad = 'Please Wait...';
    more = '';
    searchBy = searchQuote(searchText, searchType);
    console.log(searchText);
    console.log(searchType);
  }
</script>

<div class="mx-auto max-w-lg">
  <div class="relative flex">
    <label
      for="search-dropdown"
      class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >Search</label
    >
    <button
      id="dropdown-button"
      data-dropdown-toggle="dropdown"
      on:click={() => (dropdown = !dropdown)}
      class="z-10 inline-flex flex-shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
      type="button"
      >{searchType}
      {#if dropdown}
        <i class="fa-solid fa-angle-up mx-1" />
      {:else}
        <i class="fa-solid fa-angle-down mx-1" />
      {/if}
    </button>
    <div
      id="dropdown"
      class:hidden={!dropdown}
      class="absolute top-12 z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
    >
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdown-button"
      >
        {#each ['Author', 'Text', 'Tag(s)'] as item}
          <li>
            <div
              class="flex rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <div class="flex h-5 items-center">
                <input
                  id={item}
                  name="search"
                  type="radio"
                  bind:group={searchType}
                  value={item}
                  class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                />
              </div>
              <div class="ms-2 text-sm">
                <label
                  for={item}
                  class="font-medium text-gray-900 dark:text-gray-300"
                >
                  <div>{item}</div>
                </label>
              </div>
            </div>
          </li>
        {/each}
      </ul>
    </div>
    <div class="relative w-full">
      <input
        type="search"
        id="search-dropdown"
        class="z-20 block w-full rounded-e-lg border border-s-2 border-gray-300 border-s-gray-50 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:border-s-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
        placeholder="Search For Quotes..."
        bind:value={searchText}
        required
      />
      <button
        type="submit"
        on:click={search}
        class="absolute end-0 top-0 h-full rounded-e-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <i class="fa-solid fa-magnifying-glass" />
        <span class="sr-only">Search</span>
      </button>
    </div>
  </div>
</div>

<!-- Main modal -->
<dialog class="backdrop:bg-gray-50">
  <form method="dialog">
    <div
      class="relative mx-auto max-w-lg overflow-hidden rounded-lg bg-white shadow dark:bg-gray-700"
    >
      <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <h3>{textLoad}</h3>
      </div>
    </div>
  </form>
</dialog>
