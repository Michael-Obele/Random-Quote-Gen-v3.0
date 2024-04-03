import { error } from '@sveltejs/kit';

export async function load({ params }) {
  let slug = params.slug;

  if (slug.includes(' ')) {
    slug = slug.split(' ').join('-');
  }
  let url = `https://api.quotable.io/search/authors?query=${slug}`;
  const res = await fetch(url);
  const result = await res.json();
  return { slug, result };
}
