<script>
	//@ts-nocheck

	import { islogin } from '$lib/store';
	import { fade } from 'svelte/transition';
	import { circOut } from 'svelte/easing';

	const details = [
		{ name: 'Apex', singer: 'Far Out', provider: 'Nomen', path: '/src/static/audio/Apex.mp3' },
		{ name: 'S.T.A.Y.', singer: 'Delta Heavy/Hans Zimmer', provider: 'Nomen', path: '/src/static/audio/S_T_A_Y_.mp3' },
	];
	let audio = { pause: () => {} };
</script>

{#if $islogin}
	<div transition:fade={{ duration: 200, easing: circOut }}>
		<div class="max-w-screen-xl mx-auto px-4 md:px-8 mt-5">
			<div class="max-w-lg">
				<h3 class="text-gray-800 text-xl font-bold sm:text-2xl">音乐</h3>
				<p class="text-gray-600 mt-2">
					如需在此处获取更多音乐，请提供音频或可供下载的网址（警告：大部分歌曲带有版权，如有侵权行为由提供者承担）
				</p>
				<p class="text-gray-600 mt-2">
					For more music here, please provide the audio or downloadable URL (warning: most songs are
					copyrighted and any infringement is at the provider's expense)
				</p>
			</div>
			<button
				class="px-6 py-4 whitespace-nowrap"
				on:click={() => {
					audio.pause();
				}}>停止</button
			>
			<div class="mt-12 shadow-sm border rounded-lg overflow-x-auto">
				<table class="w-full table-auto text-sm text-left">
					<thead class="bg-gray-50 text-gray-600 font-medium border-b">
						<tr>
							<th class="py-3 px-6">歌曲名</th>
							<th class="py-3 px-6">歌手/乐队</th>
							<th class="py-3 px-6">提供者</th>
							<th class="py-3 px-6" />
						</tr>
					</thead>
					<tbody class="text-gray-600 divide-y">
						{#each details as musicdetails}
							<tr class=" my-5">
								<td class="px-6 py-4 whitespace-nowrap">{musicdetails.name}</td>
								<td class="px-6 py-4 whitespace-nowrap">{musicdetails.singer}</td>
								<td class="px-6 py-4 whitespace-nowrap">{musicdetails.provider}</td>
								<button
									class="px-6 py-4 whitespace-nowrap"
									on:click={() => {
										audio.pause();
										audio = new Audio(musicdetails.path);
										audio.play();
									}}>播放</button
								>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
{/if}
