<script lang="ts">
  import { background } from '$lib/store';
  import Download from '$lib/logos/download.svelte';
  import Copy from '$lib/logos/copy.svelte';

  export let title: string;
  export let body: string;
  export let isLoading: boolean;
</script>

<div
  class="borderbg-white mx-auto block h-fit w-full max-w-sm rounded-xl px-4 py-6 shadow hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 md:max-w-xl md:p-12"
>
  <h5
    class="mb-3 whitespace-break-spaces text-center text-base italic text-gray-700 dark:text-gray-400 md:mb-12 md:text-xl"
  >
    {title}
  </h5>

  <svg
    class="h-5 w-5 text-gray-400 dark:text-gray-600 md:mb-1 md:h-8 md:w-8"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 18 14"
  >
    <path
      d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"
    />
  </svg>
  <p class="my-4 p-2 px-1 text-2xl font-bold text-white md:p-8 md:text-4xl">
    <q>
      {body}
    </q>
  </p>

  <hr class="my-8 h-px border-0 bg-gray-200" />
  {#if isLoading}
    <div class="flex justify-center space-x-5">
      <button
        disabled
        style="background-color:{$background}"
        class="rounded-full px-16 py-2 text-lg capitalize text-white md:px-20 md:text-xl"
        >..loading</button
      >
      <button
        disabled
        style="background-color:{$background + '6b'}"
        class="ms-2 inline-flex items-center justify-center rounded-full px-3 text-white md:h-14 md:w-14 md:px-0"
      >
        <Download />
      </button>
      <button
        disabled
        style="background-color:{$background + '6b'}"
        class="ms-2 inline-flex items-center justify-center rounded-full px-3 text-white md:h-14 md:w-14 md:px-0"
      >
        <Copy />
      </button>
    </div>
  {:else}
    <slot><!-- optional fallback --></slot>
  {/if}
</div>
