<script lang="ts">
  import { Quote } from 'lucide-svelte';

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

{#each group as item}
  <hr
    class="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"
  />

  <h3 data-sveltekit-preload-data="false" class="text-center text-3xl">
    <a
      href="/${item.name}"
      on:click={() => (window.location.href = `/${item.name}`)}
    >
      {item.name}
    </a>
  </h3>
  <hr
    class="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"
  />
  <span class="text-xl">
    <p>
      <span class="font-extrabold"> Link: </span>
      <a href={item.link} class="text-lg after:content-['_↗']">
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

  <div class="my-10">
    <h3 class="text-center text-2xl font-semibold">Bio:</h3>

    <blockquote
      class="text-xl font-semibold italic text-gray-900 dark:text-white"
    >
      <Quote />
      <p>
        {item.bio}
      </p>
    </blockquote>
  </div>
  <p>
    <span class="mx-1 font-semibold"> Quote Count: </span>
    {item.quoteCount}
  </p>
{/each}

<!-- 

**You can repeat the same structure with slight variations for each author object in your data** (consider adding an image for each author next to the title)

## Alice Walker ([center])  **(Author name with centered alignment)**

**Link:** [Alice Walker](https://en.wikipedia.org/wiki/Alice_Walker)  **(Link with underline decoration)**

**Description:** American author and activist  **(Text alignment: Left, Font style: Consider italics)**

**(Add Bio, Quote Count, Date Added, and Date Modified sections similar to Albert Einstein)**

<hr>

## Saul Alinsky ([center])  **(Author name with centered alignment)**

**(Add details for Saul Alinsky following the same structure as previous authors)**

<hr>

**(Continue this pattern for each author object in your data)**

 -->
