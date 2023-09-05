<script>
  let number = 3;
  $: number;
  let quoteSearch = '';
  console.log(quoteSearch);

  let promise = getRandomQuote(number);

  /**
   * @param {number} num
   */
  async function getRandomQuote(num) {
    let url = 'https://api.quotable.io/quotes/random?limit=' + num;
    const res = await fetch(url);
    const text = await res.json();
    console.log(url);
    return text;
  }

  function handleClick() {
    if (number > 0) {
      promise = getRandomQuote(number);
    } else {
      alert('Enter a number greater than or equal to 1');
    }
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
<!-- Form -->

<div class="w-7/12 mx-auto">
  <form class="flex items-center">
    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      />
      <input
        type="text"
        id="simple-search"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search for quote..."
        bind:value={quoteSearch}
        required
      />
    </div>
    <button
      type="submit"
      class="p-2.5 ml-2 text-base font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <i class="fa-solid fa-magnifying-glass fa-lg" />
      <span class="sr-only">Search</span>
    </button>
  </form>
</div>
