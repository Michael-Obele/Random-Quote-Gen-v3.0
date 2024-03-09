<script>
  import { background, DarkColors } from '$lib/store';
  import Download from '$lib/logos/download.svelte';
  import Card from '$lib/components/Card.svelte';
  import Copy from '$lib/logos/copy.svelte';

  let isLoading = true;
  let loadingText = '...loading';
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
  <Card title="Random Quote" body={quoteText} isLoading={true} />
{:then quote}
  <Card
    title={`${quote.author} - ${quote.tags}`}
    isLoading={false}
    body={quoteText}
  >
    <div class="flex justify-between">
      <button
        style="background-color:{$background}"
        class="rounded-full px-6 py-2 text-xl capitalize text-white"
        on:click={generateQuote}>Random</button
      >
      <button
        style="background-color:{$background + '6b'}"
        class="rounded-full px-6 py-2 text-xl capitalize text-white"
        on:click={generateQuote}
      >
        <Download />
      </button>
      <button
        style="background-color:{$background + '6b'}"
        class="rounded-full px-6 py-2 text-xl capitalize text-white"
        on:click={generateQuote}
      >
        <Copy />
      </button>
    </div>
  </Card>
{:catch error}
  <Card
    title={`Error`}
    body={`Something went wrong: ${error.message}`}
    isLoading={true}
  />
{/await}
