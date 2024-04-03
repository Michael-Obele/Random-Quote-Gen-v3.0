<script lang="ts">
  import Info from '$lib/Info.svelte';

  import { dynamicColor, DarkColors } from '$lib/store';
  import Download from '$lib/logos/download.svelte';
  import Copy from '$lib/logos/copy.svelte';
  import Card from '$lib/components/Card.svelte';
  import domtoimage from 'dom-to-image';

  let isLoading = true;
  let loadingText = '...loading';
  let quoteText = '';
  let typing = false;
  let copied = false;
  let saving = false;

  function typeText(text: string) {
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
    textToCopy = `${quote.author} - ${quote.content}`;
    const colorIndex = Math.floor(Math.random() * DarkColors.length);
    dynamicColor.set(DarkColors[colorIndex]);
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
    const cardElement = document.getElementById('card');
    if (!cardElement) return; // Handle potential missing element
    saving = true;
    const imageData = await domtoimage.toPng(cardElement, { scale: 0.5 });
    var img = new Image();
    img.src = imageData;
    var link = document.createElement('a');
    link.href = img.src;
    link.download = `quote_${Math.floor(Math.random() * 10000)}.png`;
    link.click();
    saving = false;
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
      <div class="flex justify-center space-x-5">
        <button
          style="background-color:{$dynamicColor}"
          class="rounded-full px-16 py-2 text-lg capitalize text-white md:px-20 md:text-xl"
          on:click={generateQuote}>Random</button
        >
        <button
          style="background-color:{$dynamicColor + '6b'}"
          class="ms-2 inline-flex items-center justify-center rounded-full px-3 text-white md:h-14 md:w-14 md:px-0"
          on:click={saveQuoteImage}
          disabled={typing}
        >
          <Download />
        </button>
        <button
          style="background-color:{$dynamicColor + '6b'}"
          class="ms-2 inline-flex items-center justify-center rounded-full px-3 text-white md:h-14 md:w-14 md:px-0"
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
    button="Error"
  />
{/await}
<div class:hidden={!copied} class="mx-auto mt-5 max-w-fit md:max-w-sm">
  <Info text={'Copying'} />
</div>
<div class:hidden={!saving} class="mx-auto mt-5 max-w-fit md:max-w-sm">
  <Info>
    <span class="font-medium">Please Wait!</span> Quote is Saving!
  </Info>
</div>
