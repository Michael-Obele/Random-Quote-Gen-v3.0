<script lang="ts">
  import { dynamicColor } from '$lib/store';
  import Download from '$lib/logos/download.svelte';
  import Copy from '$lib/logos/copy.svelte';
  import Quotation from '$lib/logos/quotation.svelte';

  export let title: string;
  export let body: string;
  export let isLoading: boolean;
  export let button = '...loading';
</script>

<div
  class="mx-auto block h-fit w-full max-w-sm rounded-xl border bg-white px-4 py-6 text-black shadow hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 md:max-w-xl md:p-12"
>
  <h5
    class="mb-3 whitespace-break-spaces text-center text-base italic text-gray-700 dark:text-gray-400 md:mb-12 md:text-xl"
  >
    {title}
  </h5>

  <Quotation />
  <p
    class="my-4 p-2 px-1 text-2xl font-bold dark:text-white md:p-8 md:text-4xl"
  >
    <q>
      {body}
    </q>
  </p>

  <hr class="my-8 h-px border-0 bg-gray-200" />
  {#if isLoading}
    <div class="flex justify-center space-x-5">
      <button
        disabled
        style="background-color:{$dynamicColor}"
        class="rounded-full px-16 py-2 text-lg capitalize dark:text-white md:px-20 md:text-xl"
        >{button}</button
      >
      <button
        disabled
        style="background-color:{$dynamicColor + '6b'}"
        class="ms-2 inline-flex items-center justify-center rounded-full px-3 text-white md:h-14 md:w-14 md:px-0"
      >
        <Download />
      </button>
      <button
        disabled
        style="background-color:{$dynamicColor + '6b'}"
        class="ms-2 inline-flex items-center justify-center rounded-full px-3 text-white md:h-14 md:w-14 md:px-0"
      >
        <Copy />
      </button>
    </div>
  {:else}
    <slot><!-- optional fallback --></slot>
  {/if}
</div>
