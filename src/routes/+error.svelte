<script>
	import { page } from '$app/stores';
	import { islogin } from '$lib/store';
</script>

{#if $islogin}
	<div class="max-w-screen-xl mx:auto px-4 flex items-center justify-start h-screen md:px-8">
		<div class="max-w-lg mx-auto space-y-3 text-center">
			<h3 class=" text-4xl font-semibold sm:text-5xl text-main-text">{$page.error.message}</h3>
			<p class="text-gray-600 ">可能发生了一些问题,如果你认为这是一个意外,请联系站点所有者</p>
			<a href="/" class="text-main duration-150 font-medium inline-flex items-center gap-x-1">
				返回
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="w-5 h-5"
				>
					<path
						d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
						clipRule="evenodd"
					/>
				</svg>
			</a>
		</div>
	</div>
{/if}
