<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { Quote } from 'lucide-svelte';

  let url = $page.params.url;

  interface Quotes {
    count: number;
    totalCount: number;
    page: number;
    totalPages: number;
    lastItemIndex: number | null;
    results: QuoteResult[];
  }

  interface QuoteResult {
    _id: string;
    content: string;
    author: string;
    tags: string[];
    authorSlug: string;
    length: number;
    dateAdded: string;
    dateModified: string;
  }
  let quotes: QuoteResult[] = [];

  let Url = `https://api.quotable.io/quotes?author=${url}`;
  async function quote(): Promise<Quotes> {
    const res = await fetch(Url);
    const result = await res.json();
    console.log(result.results);
    quotes = result.results;
    return result;
  }
  onMount(() => {
    quote();
  });
</script>

{#if quotes}
  <h3 class="text-center text-3xl">
    Quotes by
    <span class="font-semibold">
      {url}
    </span>
  </h3>
  {#each quotes as quote}
    <ul
      class="mx-auto w-3/4 space-y-10 text-wrap text-left text-2xl text-gray-500 dark:text-gray-400"
    >
      <li class="my-12 flex w-full items-center space-x-4 rtl:space-x-reverse">
        <span>
          <blockquote
            class="text-xl font-semibold italic text-gray-900 dark:text-white"
          >
            <Quote size="30" class="m-1" />
            <p>
              <q>
                {quote.content}
              </q>
            </p>
          </blockquote>
        </span>
      </li>
    </ul>
  {/each}
{/if}
