<script lang="ts">
  export let title: string;
  export let body: string;
  export let svg = '';
</script>

<div
  class="rounded-xl border border-r-gray-200 bg-gray-900 p-6 dark:border-gray-700"
>
  <img class="h-12 w-12" src={svg} alt={title} />

  <h1 class="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
    {title}
  </h1>

  <p class="mt-2 text-gray-500 dark:text-gray-400">
    {body}
  </p>
</div>
