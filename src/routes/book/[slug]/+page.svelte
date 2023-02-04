<script>
	import { onMount } from 'svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	let loadt = false;
	let fhtml = data.resolve
		? data.content
		: `<h6>访问错误，请确认是否已经启动WebDriver | 请求参数:${data.slug}</h6>`;
	onMount(() => {
		if (localStorage.getItem('username') === null || localStorage.getItem('password') === null)
			location.href = '/';
		else {
			loadt = true;
		}

		document.querySelectorAll('a').forEach((link) => {
			link.addEventListener('click', (event) => {
				event.preventDefault();
				window.open(event.target.href, '_self');
			});
		});
	});
</script>

{#if loadt}
	{@html fhtml}
{/if}
