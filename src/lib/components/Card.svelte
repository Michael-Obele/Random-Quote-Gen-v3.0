<script lang="ts">
  import { background } from '$lib/store';

  export let title: string;
  export let body: string;
  export let isLoading: boolean;
</script>

<div
  class="mx-auto block h-fit w-full max-w-xl rounded-xl border border-gray-200 bg-white p-12 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
>
  <h5 class="mb-12 text-center text-xl italic text-gray-700 dark:text-gray-400">
    {title}
  </h5>

  <svg
    class="mb-1 h-8 w-8 text-gray-400 dark:text-gray-600"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 18 14"
  >
    <path
      d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"
    />
  </svg>
  <p class="mb-4 p-8 text-4xl font-bold text-white">
    <q>
      {body}
    </q>
  </p>

  <hr class="my-8 h-px border-0 bg-gray-200" />
  {#if isLoading}
    <button
      disabled
      style="background-color:{$background}"
      class="rounded-full px-6 py-2 text-xl capitalize text-white"
      >...loading</button
    >
  {:else}
    <slot><!-- optional fallback --></slot>
  {/if}
</div>
