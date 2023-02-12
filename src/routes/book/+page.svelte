<script>
	//@ts-nocheck

	import Noticeerror from '$lib/svelte/noticeerror.svelte';
	import { onMount } from 'svelte';
	import { fade, slide, fly, scale, draw, blur } from 'svelte/transition';
	import { cubicOut, circOut } from 'svelte/easing';

	let srcdoc;
	let src = '';
	let btcontent = '加载';
	let disabled = true;
	let state = '端点正在初始化...';
	let err = '';
	let srcl = '';
	let message = '';
	let username = '',
		accessKey = '';
	let done = false;
	$: loadt = false;
	let pageurl;
	let windowl;
	let log = '';
	let iswrong = {
		wrong: false,
		mes: ''
	};
	let focus = false;

	onMount(() => {
		state = '端点初始化完成';
		disabled = false;
		pageurl = new URL(window.location.href);
		if (localStorage.getItem('username') === null || localStorage.getItem('password') === null)
			location.href = '/';
		else {
			username = localStorage.getItem('username') || '';
			accessKey = localStorage.getItem('password') || '';
			loadt = true;
		}
		windowl = window;
		if (
			pageurl.searchParams.get('note') !== null &&
			jugeUrl(window.atob(pageurl.searchParams.get('note')))
		) {
			src = window.atob(pageurl.searchParams.get('note'));
		}
	});
	function jugeUrl(t) {
		return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(t);
	}
	async function fetchHandler() {
		btcontent = '正在加载';
		state = '请求发送成功 正在尝试启动... (启动约需1~2分钟)';
		disabled = true;
		let tgUrl = src;
		fetch('/puppeteer', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				url: src,
				username,
				accessKey
			})
		})
			.then((v) => v.json())
			.then((v) => {
				state = v.ok
					? `启动成功！ 欢迎使用Nomen代理 该代理由Q创立并维护,不承担任何法律责任,请自行承担使用过程中产生的任何问题   请注意！Nomen Proxy目前尚在测试，并不代表最终品质，并且不代表最终产品一定免费   如出现资源丢失或白屏属于正常现象`
					: `出错了，报错信息：${v.error}`;
				if (!v.ok) {
					iswrong.mes = v.error;
					iswrong.wrong = true;
				}
				srcdoc = v.webdata;
				done = true;
				srcl = done && v.ok ? `/book/${srcdoc}` : 'about:blank';
				err =
					'Puppeteer | 渲染模式：Server-side rendering | 脚本：允许 | 剩余积分:' +
					Math.round(v.point);
				message =
					'支持我：资助我以抵消服务器维护成本、网站编写的时间成本以及获得一个额外的[网页针对性优化席位]，资助10元以上可以克隆项目并且无限访问，附带后三个版本的更新与错误修复；访问会对服务器造成流量压力，并且耗尽WebDriver的总运行时常，资助可以帮助我继续开发和不断优化Nomen Proxy，这对我很有帮助';
				btcontent = '加载';
				log =
					'更新日志: NomenProxy@1.2.7 | 优化ServerSide Rending；针对小说和漫画网站进行优化，加载完整的资源；更新链接的点击事件并自动启动WebDriver与渲染器；优化资源获取，扫描图片资源；优化速度';

				setTimeout(() => {
					disabled = false;
				}, 3000);
			})
			.catch((e) => {
				err = e;
				btcontent = '加载';
				setTimeout(() => {
					disabled = false;
				}, 3000);
			});
	}
	function openWindow() {
		if (done && srcdoc) open(`/book/${srcdoc}`);
	}
</script>

<svelte:window
	on:keypress={(e) => {
		if (!disabled && e.keyCode == 13) fetchHandler();
		else return true;
	}}
/>
{#if loadt}
	<div transition:fade={{ duration: 200, easing: circOut }} class="index-label p-5">
		<h6>Nomen Web Proxy</h6>
		<div>
			<label for="price" class="block text-sm font-medium text-gray-700">网址</label>
			<div class="relative mt-1 rounded-md shadow-sm mb-3">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" />
				<input
					type="text"
					name="price"
					id="price"
					class="block w-full rounded-md border-gray-300 outline-none pl-7 pr-12 sm:text-sm pt-3 pb-3"
					placeholder="https://example.com"
					on:focus={() => (focus = true)}
					on:blur={() => (focus = false)}
					style="transition: all 0.1s ease-in-out; box-shadow: {focus
						? '0 0 0 1px #14B8A6'
						: 'none'};"
					bind:value={src}
				/>
				<div class="absolute inset-y-0 right-0 flex items-center">
					<label for="currency" class="sr-only">Currency</label>
					<select
						id="currency"
						name="currency"
						class="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-main focus:bg-main focus:text-white sm:text-sm"
					>
						<option>普通模式下加载</option>
					</select>
				</div>
			</div>
			<button
				class="bg-main hover:bg-secondary active:bg-main-text rounded-lg shadow-sm py-1 text-white w-24"
				{disabled}
				on:click={fetchHandler}
			>
				{btcontent}
			</button>
			<button
				class="bg-white border border-main hover:border-secondary rounded-lg shadow-sm py-1 text-main w-24"
				on:click={() => {
					if (confirm('确认清除缓存？清除缓存后会退出登录，仅在登录失效的情况下使用')) {
						localStorage.clear();
						location.href = '/login';
					}
				}}
				>清除缓存
			</button>
		</div>
		<br />
		<p>{state}</p>
		<p>{err}</p>
		<p>{message}</p>
		<p>{log}</p>
		<button on:click={openWindow}>{done ? '全屏' : ''}</button>
		<iframe class="ifr" src={srcl} border="0" frameborder="no" framespacing="0" title="nomenawa" />
	</div>
	<Noticeerror wrong={iswrong.wrong}>{iswrong.mes}</Noticeerror>
{/if}
<br />

<!-- https://www.colamanhua.com -->
<!-- {@html srcdoc} -->
<!--  sandbox="allow-top-navigation allow-scripts allow-same-origin allow-popups allow-pointer-lock allow-forms" -->

<!-- <iframe src="about:blank" {srcdoc} title="qwq" allowpaymentrequest="true" width="1000" height="800"></iframe> -->
<style>
	.ifr {
		width: 95%;
		height: 100%;
		resize: both;
	}

	.index-label {
		margin: 20px;
	}

	button[disabled] {
		background-color: rgb(192, 192, 192);
		color: white;
		cursor: not-allowed;
	}
</style>
