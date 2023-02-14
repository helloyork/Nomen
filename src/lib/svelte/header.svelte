<script>
	//@ts-nocheck

	import { fade } from 'svelte/transition';
	import { circOut } from 'svelte/easing';

	let appear = {
		1: false,
		2: false
	};
	let focus = {
		1: false,
		2: false
	};

	function mouseenter(num) {
		focus[num] = true;
		appear[num] = true;
	}
	function mouseleave(num) {
		focus[num] = false;
		setTimeout(() => {
			if (!focus[num]) appear[num] = false;
		}, 200);
	}
</script>

<div class="relative bg-white">
	<div class="mx-auto max-w-7xl px-6">
		<div
			class="flex items-center justify-between border-b-2 border-gray-100 py-3 md:justify-start md:space-x-10"
		>
			<div class="flex justify-start lg:w-0 lg:flex-1">
				<a href="/">
					<h4 class="font-bold text-xl italic text-secondary">Nomen Team</h4>
				</a>
			</div>
			<div class="-my-2 -mr-2 md:hidden">
				<button
					type="button"
					class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
					aria-expanded="false"
				>
					<span class="sr-only">Open menu</span>
					<!-- Heroicon name: outline/bars-3 -->
					<svg
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</button>
			</div>
			<nav class="hidden space-x-10 md:flex">
				<a href="/home" class="text-base font-medium text-gray-500 hover:text-gray-900">主页</a>
				<a href="/about" class="text-base font-medium text-gray-500 hover:text-gray-900">关于</a>
				<a href="/donate" class="text-base font-medium text-gray-500 hover:text-gray-900">资助</a>

				<div
					on:mousemove={() => mouseenter(2)}
					on:mouseenter={() => mouseenter(2)}
					on:mouseleave={() => mouseleave(2)}
					class="relative"
				>
					<a
						class="text-gray-500 group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						aria-expanded="false"
						href="/tools"
					>
						<span>所有</span>
						<svg
							class="text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
								clip-rule="evenodd"
							/>
						</svg>
					</a>
					{#if appear[2]}
						<div
							on:mousemove={() => mouseenter(2)}
							on:mouseenter={() => mouseenter(2)}
							on:mouseleave={() => mouseleave(2)}
							class=" absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0"
							transition:fade={{ duration: 200, easing: circOut }}
						>
							<div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
								<div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
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
										<svg
											width="19"
											height="19"
											viewBox="0 0 48 48"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
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
											<p class="mt-1 text-sm text-gray-500">
												使用在线Spotify Web Playback SDK听音乐
											</p>
										</div>
									</a>
									<a
										href="/library/m"
										class="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
									>
										<svg
											width="19"
											height="19"
											viewBox="0 0 48 48"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
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
								<div class="bg-gray-50 px-5 py-5 sm:px-8 sm:py-8">
									<div>
										<h3 class="text-base font-medium text-gray-500">常见问题</h3>
										<ul role="list" class="mt-4 space-y-4">
											<li class="truncate text-xs">
												<a href="/QA" class="hover:text-secondary font-normal text-gray-900"
													>为什么我无法启动Nomen Web Proxy</a
												>
											</li>

											<li class="truncate text-xs">
												<a href="/QA" class="hover:text-secondary font-normal text-gray-900"
													>为什么无法使用Spotify Web Playback</a
												>
											</li>

											<li class="truncate text-xs">
												<a href="/QA" class="hover:text-secondary font-normal text-gray-900"
													>我该如何在离线音乐库中添加我的个人喜好歌曲</a
												>
											</li>
										</ul>
									</div>
									<div class="mt-5 text-sm">
										<a href="#" class="font-medium text-main-text hover:text-secondary">
											更多内容
											<span aria-hidden="true"> &rarr;</span>
										</a>
									</div>
								</div>
							</div>
						</div>
					{/if}
				</div>
			</nav>
			<div class="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
				<a
					href="/tools"
					class="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-main px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-secondary"
					>立即开始</a
				>
			</div>
		</div>
	</div>
</div>
