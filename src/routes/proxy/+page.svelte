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

	onMount(() => {
		state = '端点初始化完成';
		disabled = false;
	});
	function fetchHandler() {
		btcontent = '正在加载';
		state = '请求发送成功 正在尝试启动...';
		disabled = true;
		fetch('/e7n3', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url: src })
		})
			.then((v) => v.text())
			.then((v) => {
				state = `启动成功！ 欢迎使用Q代理 该代理由Q创立并维护,不承担任何法律责任,请自行承担使用过程中产生的任何问题      如出现资源丢失或白屏属于正常现象`;
				srcdoc = JSON.parse(v);
				err = '当前使用的代理方案：puppeteer -技术支持：Q -隔离沙盒模式：开 -允许读取：关 -允许全屏：关';
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
<iframe class='ifr' src="about:blank" {srcdoc} border="0" frameborder="no" framespacing="0" title="nomenawa"
sandbox
 > </iframe>
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
