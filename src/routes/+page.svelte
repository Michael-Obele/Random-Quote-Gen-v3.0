<script>
  import { background, DarkColors } from '$lib/store';
  import Card from '$lib/components/Card.svelte';

  let isLoading = true;
  let loadingText = '...';
  let quoteText = '';

  /**
   * @param {string} text
   */
  function typeText(text) {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        quoteText = text.substring(0, index);
        index++;
      } else {
        if (text == '...') {
          index = 0; // Reset the index to start over
        }
        clearInterval(interval);
      }
    }, 100);
  }

  if (isLoading) {
    typeText(loadingText);
  }

  const quoteUrl = 'https://api.quotable.io/quotes/random';
  let quoteToDisplay = '';

  let randomQuotePromise = fetchRandomQuote();

  async function fetchRandomQuote() {
    const response = await fetch(quoteUrl);
    const quoteData = await response.json();
    const quote = quoteData[0];
    isLoading = false;
    quoteText = quote.content;
    typeText(quoteText);
    const currentTime = new Date().toLocaleTimeString([], {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    quoteToDisplay = `${quote.author} - ${quote.content}`;
    quote.time = currentTime;
    const colorIndex = Math.floor(Math.random() * DarkColors.length);
    background.set(DarkColors[colorIndex]);
    return quote;
  }

  function generateQuote() {
    randomQuotePromise = fetchRandomQuote();
  }
</script>

{#await randomQuotePromise}
  <Card title="Random Quote" body={quoteText}>
    <hr class="my-8 h-px border-0 bg-gray-200" />
    <button
      disabled
      style="background-color:{$background}"
      class="rounded-full px-6 py-2 text-xl capitalize text-white"
      >...loading</button
    >
  </Card>
{:then quote}
  <Card title="Random Quote" body={quoteText}>
    <hr class="my-8 h-px border-0 bg-gray-200" />
    <button
      style="background-color:{$background}"
      class="rounded-full px-6 py-2 text-xl capitalize text-white"
      on:click={generateQuote}>Random</button
    >
  </Card>
{:catch error}
  <div
    class="mx-auto block h-fit w-full max-w-xl rounded-xl border border-gray-200 bg-white p-12 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
  >
    <h5 class="mb-12 text-xl italic text-gray-700 dark:text-gray-400">Error</h5>
    <p class="mb-4 p-8 text-4xl font-bold text-white">
      &quot; `Something went wrong: ${error.message}` &quot;
    </p>
  </div>
{/await}
