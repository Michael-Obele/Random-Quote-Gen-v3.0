<script>
  import { background, DarkColors } from '$lib/store';
  import Download from '$lib/logos/download.svelte';
  import Copy from '$lib/logos/copy.svelte';
  import Card from '$lib/components/Card.svelte';
  import domtoimage from 'dom-to-image';

  let isLoading = true;
  let loadingText = '...loading';
  let quoteText = '';
  let typing = false;
  let copied = false;

  /**
   * @param {string} text
   */
  function typeText(text) {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        typing = true;
        quoteText = text.substring(0, index);
        index++;
      } else {
        typing = false;
        clearInterval(interval);
      }
    }, 95);
  }

  if (isLoading) {
    typeText(loadingText);
  }

  const quoteUrl = 'https://api.quotable.io/quotes/random';
  let textToCopy = '';

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
    textToCopy = `${quote.author} - ${quote.content}`;
    quote.time = currentTime;
    const colorIndex = Math.floor(Math.random() * DarkColors.length);
    background.set(DarkColors[colorIndex]);
    return quote;
  }

  function generateQuote() {
    randomQuotePromise = fetchRandomQuote();
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(textToCopy);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 1500);
  }

  async function saveQuoteImage() {
    const cardElement = document.getElementById('card'); // Assuming card has class 'card'
    if (!cardElement) return; // Handle potential missing element

    const imageData = await domtoimage.toJpeg(cardElement, { quality: 0.95 });
    const link = document.createElement('a');
    link.href = imageData;
    link.download = 'my-quote.jpeg';
    link.click();
  }
</script>

{#await randomQuotePromise}
  <Card title="Random Quote" body={quoteText} isLoading={true} />
{:then quote}
  <div id="card">
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
          class="ms-2 inline-flex h-14 w-14 items-center justify-center rounded-full text-white"
          on:click={saveQuoteImage}
          disabled={typing}
        >
          <Download />
        </button>
        <button
          style="background-color:{$background + '6b'}"
          class="ms-2 inline-flex h-14 w-14 items-center justify-center rounded-full text-white"
          on:click={copyToClipboard}
        >
          <Copy />
        </button>
      </div>
    </Card>
  </div>
{:catch error}
  <Card
    title={`Error`}
    body={`Something went wrong: ${error.message}`}
    isLoading={true}
  />
{/await}
<div class:hidden={!copied} class="mx-auto mt-5 max-w-md">
  <div
    class="mb-4 flex items-center rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-gray-800 dark:text-green-400"
    role="alert"
  >
    <svg
      class="me-3 inline h-4 w-4 flex-shrink-0"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
      />
    </svg>
    <span class="sr-only">Info</span>
    <div>
      <span class="font-medium">Success!</span> Quote Copied...
    </div>
  </div>
</div>
