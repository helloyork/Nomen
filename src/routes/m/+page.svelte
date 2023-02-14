<script>
    import { islogin } from '$lib/store';
    import { fade } from 'svelte/transition';
	import { circOut } from 'svelte/easing';
</script>

{#if $islogin}
	<div transition:fade={{ duration: 200, easing: circOut }} class="max-w-screen-xl mx:auto px-4 flex items-center justify-start h-screen md:px-8">
		<div class="max-w-lg mx-auto space-y-3 text-center">
			<h3 class=" text-3xl font-semibold sm:text-xl text-main-text">暂不可用</h3>
			<p class="text-gray-600 ">Spotify远程播放需要一个Premium账户授权，如果您拥有Premium账户，可与搭建者联系并且启动该功能</p>
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