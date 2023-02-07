<script>
	import { onMount } from 'svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	let loadt = false;
    data.rows.sort((a, b) => a.origin.localeCompare(b.origin));
    let size = (data.size / 1024 / 1024).toFixed(2) + ' MB';
	onMount(() => {
		if (localStorage.getItem('username') === null || localStorage.getItem('password') === null)
			location.href = '/';
		else {
			loadt = true;
		}
	});
    async function clear(identifier){
        await fetch('/book/clear',{method:"POST",body:JSON.stringify({identifier})});
        location.reload();
    }
</script>

{#if loadt}
    <h6>{size}</h6>
	<ul id="weblist">
		{#each data.rows as row}
			<li><button on:click={()=>clear(row.identifier)}>删除</button> {row.origin} : <a href="/book/{row.identifier}" target="_blank" rel="noreferrer">{row.identifier}</a></li>
		{/each}
	</ul>
{/if}
