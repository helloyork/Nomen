
 
/** @type {import('./$types').LayoutServerLoad} */
export async function load({params}) {
  return {
    content:params,
    isSlug:params.slug!==undefined
  };
}