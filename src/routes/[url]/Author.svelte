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

  export let author: Author[] = [];
</script>

<h3 class="my-4 text-center text-3xl md:my-10">
  {author[0].name}
</h3>
<hr
  class="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"
/>
<span class="text-xl">
  <p>
    <span class="font-extrabold"> Link: </span>
    <a
      rel="noopener noreferrer"
      target="_blank"
      href={author[0].link}
      class="text-lg after:content-['_↗']"
    >
      Wiki of
      <span class="font-semibold">
        {author[0].name}
      </span>
    </a>
  </p>
</span>

<p class="text-xl italic">
  <span class="font-semibold"> Description: </span>
  {author[0].description}
</p>

<div class="my-10">
  <h3 class="text-center text-2xl font-semibold">Bio:</h3>

  <blockquote
    class="text-xl font-semibold italic text-gray-900 dark:text-white"
  >
    <Quote />
    <p>
      {author[0].bio}
    </p>
  </blockquote>
</div>
<a
  target="_blank"
  rel="noopener noreferrer"
  data-sveltekit-reload
  href="/{author[0].name}/quote"
>
  <span class="mx-1 font-semibold"> Quote Count: </span>
  {author[0].quoteCount}
</a>
