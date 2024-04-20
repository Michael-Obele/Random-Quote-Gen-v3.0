<script lang="ts">
  import { dynamicColor } from '$lib/store';

  interface Author {
    _id: string;
    name: string;
    link: string;
    bio: string;
    description: string;
    quoteCount: number;
    slug: string;
    dateAdded: string;
    dateModified: string;
  }

  export let group: Author[] = [];
</script>

<h3 class="my-2 py-5 text-center text-3xl text-white">
  There were {group.length} results from the Search
</h3>

{#each group as item, i}
  <h3
    data-sveltekit-preload-data="false"
    style="background-color: {$dynamicColor};"
    class="mx-auto mt-10 w-fit rounded bg-blue-600 p-4 px-2 text-center text-3xl text-white after:content-['_↗'] dark:bg-blue-500"
  >
    <a href={item.name} data-sveltekit-reload>
      {item.name}
    </a>
  </h3>
  <hr
    class="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"
  />
  <div class="space-y-6 text-center">
    <span class="text-xl">
      <p>
        <span class="font-extrabold"> Link: </span>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={item.link}
          class="text-lg after:content-['_↗']"
        >
          Wiki of
          <span class="font-semibold">
            {item.name}
          </span>
        </a>
      </p>
    </span>

    <p class="text-xl italic">
      <span class="font-semibold"> Description: </span>
      {item.description}
    </p>

    <a
      target="_blank"
      rel="noopener noreferrer"
      data-sveltekit-reload
      href="{item.name}/quote"
    >
      <span class="mx-1 font-semibold"> Quote Count: </span>
      {item.quoteCount}
    </a>
    <div
      class:hidden={i === group.length - 1}
      class="inline-flex w-full items-center justify-center"
    >
      <hr class="my-8 h-px w-64 border-0 bg-gray-200 dark:bg-gray-700" />
      <span
        class="absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium text-gray-900 dark:bg-gray-900 dark:text-white"
        >or</span
      >
    </div>
  </div>
{/each}
