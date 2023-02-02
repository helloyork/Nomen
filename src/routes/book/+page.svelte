<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let srcdoc = '';
	let src = '';
	let btcontent = '加载';
	let disabled = true;
	let state = '端点正在初始化...';
	let err = '';
	let message = '';
	let username='',accessKey='';
	let loadt=false;

	onMount(() => {
		state = '端点初始化完成';
		disabled = false;
		if (
			localStorage.getItem('username') === null ||
			localStorage.getItem('username') === undefined ||
			localStorage.getItem('accessKey') === null ||
			localStorage.getItem('accessKey') === undefined
		)
			location.href = '/';
		else {
			username=localStorage.getItem('username')||'';
			accessKey=localStorage.getItem('accessKey')||'';
			loadt=true;
		}
	});
	async function fetchHandler() {
		btcontent = '正在加载';
		state = '请求发送成功 正在尝试启动... (启动约需20秒~40秒)';
		disabled = true;
		fetch('/selenium', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				url: src,
				username,
				accessKey,
			})
		})
			.then((v) => v.json())
			.then((v) => {
				state = v.ok?`启动成功！ 欢迎使用Q代理 该代理由Q创立并维护,不承担任何法律责任,请自行承担使用过程中产生的任何问题      如出现资源丢失或白屏属于正常现象`
				:`出错了，报错信息：${v.error}`;
				srcdoc = v.result;
				// console.log(v);
				err = '当前使用的代理方案：Selenium WebDriver | 脚本：拦截';
				message =
					'支持我：资助我以抵消服务器维护成本、网站编写的时间成本以及获得一个额外的[网页针对性优化席位]';
				btcontent = '加载';
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
</script>

{#if loadt}
<div>
	<input bind:value={src} />
	<button on:click={fetchHandler} {disabled}>
		{btcontent}
	</button>
</div>
<br />
<p>{state}</p>
<p>{err}</p>
<p>{message}</p>
{/if}

<iframe
	class="ifr"
	src="about:blank"
	{srcdoc}
	border="0"
	frameborder="no"
	framespacing="0"
	title="nomenawa"
	sandbox
/>
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
</style>
