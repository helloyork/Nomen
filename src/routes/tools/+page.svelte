<script>
	import { islogin } from '$lib/store';
	import { fade } from 'svelte/transition';
	import { circOut } from 'svelte/easing';
</script>

{#if islogin}
	<div
		class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8"
		transition:fade={{ duration: 200, easing: circOut }}
	>
		<a href="/book" class="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50">
			<svg
				class="h-6 w-6 flex-shrink-0 text-indigo-600"
				width="19"
				height="19"
				viewBox="0 0 48 48"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				><rect
					x="4"
					y="8"
					width="40"
					height="32"
					rx="3"
					stroke="#14B8A6"
					stroke-width="1"
					stroke-linejoin="round"
				/><path
					d="M4 11C4 9.34315 5.34315 8 7 8H41C42.6569 8 44 9.34315 44 11V20H4V11Z"
					fill="none"
					stroke="#14B8A6"
					stroke-width="1"
				/><circle
					r="2"
					transform="matrix(-1.31134e-07 -1 -1 1.31134e-07 10 14)"
					fill="#14B8A6"
				/><circle
					r="2"
					transform="matrix(-1.31134e-07 -1 -1 1.31134e-07 16 14)"
					fill="#14B8A6"
				/></svg
			>
			<div class="ml-4">
				<p class="text-base font-medium text-gray-900">网页代理</p>
				<p class="mt-1 text-sm text-gray-500">查看被阻挡或被禁用的网址</p>
			</div>
		</a>
		<a href="/m" class="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50">
			<svg width="19" height="19" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
				><path
					d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 21.2883 43.4603 18.7026 42.4825 16.3446C42.2308 15.7376 41.9501 15.1457 41.6421 14.5707"
					stroke="#14B8A6"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"
				/><path
					d="M35 10C37.2091 10 39 8.65685 39 7C39 5.34315 37.2091 4 35 4C32.7909 4 31 5.34315 31 7C31 8.65685 32.7909 10 35 10Z"
					fill="none"
					stroke="#14B8A6"
					stroke-width="1"
					stroke-linejoin="round"
				/><path
					d="M24 31C27.866 31 31 27.866 31 24C31 20.134 27.866 17 24 17C20.134 17 17 20.134 17 24C17 27.866 20.134 31 24 31Z"
					fill="none"
					stroke="#14B8A6"
					stroke-width="1"
					stroke-linejoin="round"
				/><path
					d="M31 6.5V24"
					stroke="#14B8A6"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"
				/></svg
			>
			<div class="ml-4">
				<p class="text-base font-medium text-gray-900">Spotify</p>
				<p class="mt-1 text-sm text-gray-500">使用在线Spotify Web Playback SDK听音乐</p>
			</div>
		</a>
		<a href="/library/m" class="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50">
			<svg width="19" height="19" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
				><path
					d="M10 44H38C39.1046 44 40 43.1046 40 42V14H30V4H10C8.89543 4 8 4.89543 8 6V42C8 43.1046 8.89543 44 10 44Z"
					fill="none"
					stroke="#14B8A6"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"
				/><path
					d="M30 4L40 14"
					stroke="#14B8A6"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"
				/><path
					d="M31 20L25 22.9688V33.5"
					stroke="#14B8A6"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"
				/><circle
					cx="21"
					cy="33"
					r="4"
					fill="none"
					stroke="#14B8A6"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"
				/></svg
			>
			<div class="ml-4">
				<p class="text-base font-medium text-gray-900">离线音乐库</p>
				<p class="mt-1 text-sm text-gray-500">储存的音乐资料库</p>
			</div>
		</a>
	</div>
{/if}
