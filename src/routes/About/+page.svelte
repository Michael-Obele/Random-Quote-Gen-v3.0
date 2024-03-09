<script>
  import Simple from './Simple.svelte';

  import Card from './Card.svelte';
</script>

<div
  class="px[20px] container mx-auto h-fit min-h-screen px-6 py-10 pb-5 pt-[5vh] text-white md:pb-1 md:pt-0"
>
  <h1
    class="text-3xl font-semibold capitalize leading-loose text-white md:text-5xl md:leading-normal"
  >
    Unleash the Power of <br /> Words with Our
    <span class="underline decoration-[#A5CCFF] decoration-4"
      >Random Quote Generator App!</span
    >
  </h1>

  <h2 class="mt-4 text-3xl leading-normal dark:text-white xl:mt-6">
    In today's fast-paced world, inspiration can be hard to come by. We, at
    Happy Quotes, believe that the right words can spark creativity, ignite
    motivation, and offer a fresh perspective. That's why we've developed a
    powerful and versatile <b>Random Quote Generator App</b>. <br />
    This app goes beyond simply presenting random quotes. It empowers you to:
  </h2>
  <main class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:gap-12">
    <Card
      title="Find Inspiration"
      body=" Search through our vast database of quotes by keyword, author, or theme. Discover hidden gems or revisit old favorites to fuel your next project or simply brighten your day."
    />
    <Card
      title="Visualize Inspiration"
      body="Transform your chosen quote into a beautiful image.  Unleash your inner designer and create a visually stunning and shareable masterpiece. Play around with different fonts, backgrounds, and colors to perfectly match the quote's essence and your personal style. Download the image and use it as wallpaper, social media content, or a printed reminder."
    />
    <Card
      title="Capture Inspiration"
      body="Never lose a powerful quote again!  With a single click, copy the quote directly to your clipboard."
    />
    <Card
      title="Experience Dynamic Design"
      body=" Our app keeps things fresh with a color change for every new quote. Immerse yourself in a vibrant visual experience that complements the power of the words."
    />
  </main>

  <section class="my-12">
    <h1
      class="mb-6 text-center text-2xl font-semibold capitalize text-gray-800 dark:text-white lg:text-3xl"
    >
      Our Random Quote Generator App <br /> is the perfect
      <span class="text-[#A5CCFF]"> companion </span>for:
    </h1>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <Simple
        title="Writers and Creatives"
        body=" Find that elusive spark to ignite your next project."
        svg="https://www.svgrepo.com/show/530444/availability.svg"
      />
      <Simple
        title="Students and Professionals"
        body=" Unearth insightful quotes to support your research or presentations."
        svg="https://www.svgrepo.com/show/530437/safe-and-stable.svg"
      />
      <Simple
        title="Anyone Seeking Inspiration"
        body="Encounter thought-provoking words to elevate your day."
        svg="https://www.svgrepo.com/show/530441/surveillance-defense.svg"
      />
    </div>
  </section>
</div>
