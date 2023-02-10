<script>
	//@ts-nocheck

	export let data;

	import Noticebar from '$lib/svelte/noticebar.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { fade, slide, fly, scale, draw, blur } from 'svelte/transition';
	import Header from '$lib/svelte/header.svelte';
	import {islogin} from "$lib/store";

	onMount(() => {
		if (localStorage.getItem('username') !== null) {
			islogin.set(!data.isSlug);
		}
	});
</script>

{#if $islogin}
	<Header />
	<Noticebar />
{/if}
<slot />

<style>
</style>
