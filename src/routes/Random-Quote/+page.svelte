<script>
  let url = 'https://api.quotable.io/random';

  let promise = getRandomQuote();

  async function getRandomQuote() {
    const res = await fetch(url);
    const text = await res.json();
    const time = new Date().toLocaleTimeString([], {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    text.time = time;
    console.log(text);
    return text;
  }

  function handleClick() {
    promise = getRandomQuote();
  }
</script>

<!-- Html Part -->
<button />

{#await promise}
  <div
    class=" bg-gray-800 shadow-lg rounded-lg mx-auto my-5 max-w-md md:max-w-2xl"
  >
    <div class="px-4 py-6">
      <div class="items-center relative">
        <h2 class="text-lg font-semibold text-white -mt-1">Loading</h2>
        <small class=" absolute right-0 text-sm text-white">Loading</small>
      </div>
      <p class="text-white">Tag: loading</p>
      <p class="mt-3 text-white text-sm">Loading</p>
      <div class=" text-center mx-auto py-2">
        <button class=" bg-amber-400 w-2/4 rounded-lg"
          >generating
          <i class="fa-solid fa-rotate fa-spin" />
        </button>
      </div>
    </div>
  </div>
{:then text}
  <p />
  <p />
  <!-- component -->
  <!-- post card -->
  <div
    class=" bg-gray-800 shadow-lg rounded-lg mx-auto my-5 max-w-md md:max-w-2xl"
  >
    <!--horizontal margin is just for display-->
    <div class="px-4 py-6">
      <div class="items-center relative">
        <h2 class="text-lg font-semibold text-white -mt-1">
          {text.author}
        </h2>
        <small class=" absolute right-0 text-sm text-white">{text.time}</small>
      </div>
      <p class="text-white">Tag: {text.tags}</p>
      <p class="mt-3 text-white text-sm">
        {text.content}
      </p>
      <div class=" text-center mx-auto py-2">
        <button on:click={handleClick} class=" bg-amber-400 w-2/4 rounded-lg"
          >generate random quote
          <i class="fa-solid fa-rotate" />
        </button>
      </div>
    </div>
  </div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
