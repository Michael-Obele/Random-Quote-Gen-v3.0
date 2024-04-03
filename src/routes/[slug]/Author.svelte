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
  <a href="/{author[0].name}">
    {author[0].name}
  </a>
</h3>
<hr
  class="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"
/>
<span class="text-xl">
  <p>
    <span class="font-extrabold"> Link: </span>
    <a href={author[0].link} class="text-lg">
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
<p>
  <span class="mx-1 font-semibold"> Quote Count: </span>
  {author[0].quoteCount}
</p>

<!-- 
## Albert Einstein ([center])  **(Consider using a larger font size and bold font style for the name)**

**Link:** [Albert Einstein](https://en.wikipedia.org/wiki/Albert_Einstein)  **(Consider using a slightly smaller font size and underline decoration for the link)**

**Description:** Theoretical physicist  **(Text alignment: Left, Font style: Consider italics)**

**Bio:**

> Albert Einstein (14 March 1879 – 18 April 1955) was a German-born theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics (alongside quantum mechanics). His work is also known for its influence on the philosophy of science.  **(Consider using a slightly smaller font size and indented text for the quote)**

**Quote Count:** 50  **(Text alignment: Left)**

**Date Added:** 2019-07-03  **(Text alignment: Left)**

**Date Modified:** 2023-04-06  **(Text alignment: Left)**


 -->
