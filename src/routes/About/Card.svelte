<script lang="ts">
  export let title: string;
  export let body: string;
</script>

<div
  class="rounded-xl border border-r-gray-200 bg-gray-900 p-6 dark:border-gray-700"
>
  <div class="md:-mx-4 md:flex md:items-start">
    <div class="mt-4 md:mx-4 md:mt-0">
      <h1 class="text-xl font-medium capitalize text-gray-700 dark:text-white">
        {title}
      </h1>

      <p class="mt-3 text-gray-500 dark:text-gray-300">
        {body}
      </p>
    </div>
  </div>
</div>
