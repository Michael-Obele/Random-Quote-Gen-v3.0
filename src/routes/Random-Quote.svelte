<script>
  import QuoteLoaded from '$lib/QuoteLoaded.svelte';
  import { onMount } from 'svelte';
  import QuoteLoading from '$lib/QuoteLoading.svelte';
  import { background, DarkColors } from '$lib/store';

  let setCounter;
  let url = 'https://api.quotable.io/quotes/random';
  // let url = 'https://api.quotable.io/quoes/random';
  let textToCopy = '';

  let promise = getRandomQuote();

  async function getRandomQuote() {
    const res = await fetch(url);
    let text = await res.json();
    text = text[0];
    const time = new Date().toLocaleTimeString([], {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    textToCopy = `${text.author} - ${text.content}`;
    text.time = time;
    setCounter = Math.floor(Math.random() * DarkColors.length);
    background.set(DarkColors[setCounter]);
    return text;
  }

  function generateQuote() {
    promise = getRandomQuote();
  }
</script>

<!-- Html Part -->
<div
  id="Random-Quote"
  class="relative h-screen pt-[10vh]"
  style="background-color:{$background}"
>
  {#await promise}
    <!-- Loading -->
    <QuoteLoading />
    <!-- End of Loading -->
  {:then text}
    <!-- Loaded -->
    <QuoteLoaded {text} {generateQuote} {textToCopy} />
  {:catch error}
    <QuoteLoaded
      text={{
        author: null,
        time: new Date().toLocaleTimeString([], {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }),
        tags: 'Not Found',
        content: `Something went wrong: ${error.message}`,
      }}
      generateQuote={() => location.reload()}
    />
  {/await}
</div>
