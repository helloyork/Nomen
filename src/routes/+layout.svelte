<script>
	//@ts-nocheck

	export let data;

	import { fade } from 'svelte/transition';
	import { circOut } from 'svelte/easing';
	import Noticebar from '$lib/svelte/noticebar.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import Header from '$lib/svelte/header.svelte';
	import { islogin } from '$lib/store';

	onMount(() => {
		if (localStorage.getItem('username') !== null) {
			islogin.set(!data.isSlug);
		}else{
			islogin.set(false);
			if(!location.href.includes('/login'))location.href = "/login";
		}
	});

	const navs = [{ name: '', target: '' }];
</script>

{#if $islogin}
	<div transition:fade={{ duration: 200, easing: circOut }}>
		<Header />
		<Noticebar />
	</div>
{/if}
<slot />

<footer class="text-gray-500 bg-white px-4 py-5 max-w-screen-xl mx-auto md:px-8">
</footer>

<style>
</style>
