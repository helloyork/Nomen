<script>
	import { islogin } from '$lib/store';
	import { fade } from 'svelte/transition';
	import { circOut } from 'svelte/easing';

	const ques = [
		{
			title: '为什么我无法启动Nomen Web Proxy?',
			content:
				'这可能是一些服务端或服务器问题导致的，如果启动出现错误，来自服务器的响应错误会出现问题弹窗，请将此弹窗提供给网站搭建者；大多数情况下，很可能是您的本地验证资料没有通过，可以尝试使用清除缓存后重新登录'
		},
		{
			title: '为什么无法使用Spotify Web Playback?',
			content:
				'Spotify Web Playback需要一个Spotify Premium账户进行授权，如果您拥有一个Premium账户，可以授权给网站并且开启该功能'
		},
		{
			title: '我该如何在离线音乐库中添加我的个人喜好歌曲?',
			content: '这很简单，向网站建造者提供您的音乐文件或可以正常下载的网址'
		}
	];
</script>

{#if $islogin}
	<div transition:fade={{ duration: 200, easing: circOut }}>
		<section class="py-14">
			<div class="max-w-screen-xl mx-auto px-4 gap-12 md:flex md:px-8">
				<div class="flex-1">
					<div class="max-w-lg">
						<p class="mt-3 text-gray-800 text-3xl font-extrabold sm:text-4xl">常见问题解答</p>
					</div>
				</div>
				<div class="flex-1 mt-12 md:mt-0">
					<ul class="space-y-4 divide-y">
						{#each ques as que}
							<li class="py-5">
								<summary class="flex items-center justify-between font-semibold text-gray-700"
									>{que.title}</summary
								>
								<p class="mt-3 text-gray-600 leading-relaxed">{que.content}</p>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</section>
	</div>
{/if}
