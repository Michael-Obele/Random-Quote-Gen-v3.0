<script lang="ts">
  export let title: string;
  export let body: string;
</script>

<div
  class="mx-auto block h-fit w-full max-w-xl rounded-xl border border-gray-200 bg-white p-12 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
>
  <h5 class="mb-12 text-xl italic text-gray-700 dark:text-gray-400">
    {title}
  </h5>
  <p class="mb-4 p-8 text-4xl font-bold text-white">
    &quot; {body} &quot;
  </p>
  <slot><!-- optional fallback --></slot>
</div>
