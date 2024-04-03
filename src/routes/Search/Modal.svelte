<script lang="ts">
  export let showModal: boolean;

  interface SelectedValue {
    author: string;
    content: string;
  }

  export let selectedValue: SelectedValue;
  import Quotation from '$lib/logos/quotation.svelte';
  import Copy from '$lib/logos/copy.svelte';
  import Download from '$lib/logos/download.svelte';
  import { dynamicColor } from '$lib/store';
  import domtoimage from 'dom-to-image';
  import Info from '$lib/Info.svelte';

  let copied = false;
  let saving = false;
  function copyToClipboard() {
    let textToCopy = `${selectedValue.author} - ${selectedValue.content}`;
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

<div
  class:hidden={!showModal}
  class="relative z-50"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
>
  <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->

  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

  <div class="fixed inset-0 z-20 w-screen overflow-y-auto">
    <div
      class="relative flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
    >
      <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
      <div
        class="relative transform overflow-hidden rounded-lg transition-all sm:my-4 sm:w-full sm:max-w-lg"
      >
        <div
          class:hidden={!saving}
          class="absolute right-1/4 top-10 z-[60] mx-auto mt-5 max-w-fit md:max-w-sm"
        >
          <Info>
            <span class="font-medium">Please Wait!</span> Quote is Saving!
          </Info>
        </div>

        {#if selectedValue}
          <div
            id="card"
            class="borderbg-white mx-auto block h-fit w-full max-w-sm rounded-xl px-4 py-6 shadow hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 md:max-w-xl md:p-12"
          >
            <h5
              class="mb-3 whitespace-break-spaces text-center text-base italic text-gray-700 dark:text-gray-400 md:mb-12 md:text-xl"
            >
              {selectedValue.author}
            </h5>

            <Quotation />
            <p
              class="my-4 p-2 px-1 text-2xl font-bold text-white md:p-8 md:text-4xl"
            >
              <q>{selectedValue.content}</q>
            </p>
            <hr class="my-8 h-px border-0 bg-gray-200" />
            <div class="flex justify-center space-x-5">
              <slot name="btn" />
              <button
                on:click={saveQuoteImage}
                style="background-color:{$dynamicColor + '6b'}"
                class="my-2 ms-2 inline-flex h-12 items-center justify-center rounded-3xl px-3 text-white md:my-0 md:h-14 md:w-14 md:px-0"
                ><Download /></button
              >
              <button
                on:click={copyToClipboard}
                style="background-color:{$dynamicColor + '6b'}"
                class="my-2 ms-2 inline-flex h-12 items-center justify-center rounded-3xl px-3 text-white md:my-0 md:h-14 md:w-14 md:px-0"
              >
                <Copy />
              </button>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
