<script>
	import { islogin } from '$lib/store';
	import { fade } from 'svelte/transition';
	import { circOut } from 'svelte/easing';
	import Ico from './ico.svelte';
</script>

{#if $islogin}
	<section class="py-14" transition:fade={{ duration: 200, easing: circOut }}>
		<div class="max-w-screen-xl px-4 text-gray-600 md:px-8 mx-72">
			<div class="relative max-w-xl mx-auto sm:text-center">
				<h3 class="text-gray-800 text-3xl font-semibold sm:text-4xl">资助我们</h3>
				<div class="mt-3 max-w-xl">
					<p>感谢您对于网站的贡献 | 让Nomen变得更好</p>
				</div>
			</div>
			<div class="mt-16 justify-center gap-6 sm:grid sm:grid-cols-1 sm:space-y-0 lg:grid-cols-2">
				<div class="relative flex-1 flex items-stretch flex-col rounded-xl border-2 mt-6 sm:mt-0 ">
					<div class="p-8 space-y-4 border-b">
						<span class="text-main font-medium">免费</span>
						<div class="text-gray-800 text-3xl font-semibold">
							$0 <span class="text-xl text-gray-600 font-normal" />
						</div>
						<p>您的意见让Nomen更好</p>
						<button
							class="px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-main-text bg-white border-main border"
							>正在使用</button
						>
					</div>
					<ul class="p-8 space-y-3">
						<li class="pb-2 text-gray-800 font-medium"><p>基础服务</p></li>
						<li class="flex items-center gap-5">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 text-main"
								viewBox="0 0 20 20"
								fill="currentColor"
								><path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/></svg
							>Nomen Web Proxy
						</li>
					</ul>
				</div>
				<div class="relative flex-1 flex items-stretch flex-col rounded-xl border-2 mt-6 sm:mt-0 ">
					<div class="p-8 space-y-4 border-b">
						<span class="text-main font-medium">基础</span>
						<div class="text-gray-800 text-3xl font-semibold">
							$1 <span class="text-xl text-gray-600 font-normal">以上</span>
						</div>
						<p>获得所有的基础服务与额外的功能</p>
						<button
							class="px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-main hover:bg-secondary active:bg-main-text"
							>立即开始</button
						>
					</div>
					<ul class="p-8 space-y-3">
						<li class="pb-2 text-gray-800 font-medium"><p>额外资源</p></li>
						<li class="flex items-center gap-5">
							<Ico/>Nomen Web Proxy
						</li>
						<li class="flex items-center gap-5">
							<Ico/>网站克隆
						</li>
						<li class="flex items-center gap-5">
							<Ico/>最新三个版本的维护与更新
						</li>
						<li class="flex items-center gap-5">
							<Ico/>Nomen Music
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
{/if}
