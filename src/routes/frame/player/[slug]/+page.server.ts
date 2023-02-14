/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
    return {
        content: params,
        slug: params.slug,
        result: ((str)=>{try{return JSON.parse(str)}catch(e){return false;}})(atob(params.slug))
    };
}