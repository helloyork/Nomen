<script>
	import { onMount } from 'svelte';
	import { islogin } from '$lib/store';
	import { fade } from 'svelte/transition';
	import { circOut } from 'svelte/easing';
</script>

{#if $islogin}
	<section transition:fade={{ duration: 200, easing: circOut }} class="mt-52 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8">
		<div class="text-center space-y-4">
			<h1 class="text-gray-800 font-bold text-4xl md:text-5xl">
				更好的
				<span class="text-main-text">互联网工具</span>
			</h1>
			<p class="text-gray-500 max-w-xl mx-auto leading-relaxed">免费开始你的UnBlock助手</p>
		</div>
		<div class="mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
			<a
				href="/tools"
				class="px-10 py-3.5 w-full bg-main hover:bg-secondary active:bg-main-text text-white text-center rounded-md shadow-md block sm:w-auto"
			>
				立即开始
			</a>
			<a
				href="/donate"
				class="px-10 py-3.5 w-full text-gray-500 text-center border rounded-md duration-300 hover:text-main-text hover:shadow block sm:w-auto"
			>
				资助我们
			</a>
		</div>
	</section>
{/if}
