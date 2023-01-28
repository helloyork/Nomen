<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let srcdoc = '';
	let src = '';
	let btcontent = '加载';
	let disabled = true;
	let password = '';
	let state = '端点正在初始化...';
	let err = '';
	let message = '';

	let jtmessage = '';
	onMount(() => {
		state = '端点初始化完成';
		disabled = false;
		//     window.addEventListener('beforeunload', (event) => {
		//         message='一个意外的重定向被阻止了';
		//         event.preventDefault();
		//         event.returnValue = '';
		// });//
	});
	function fetchHandler() {
		btcontent = '正在加载';
		disabled = true;
		fetch('/e7n3', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url: src, password })
		})
			.then((v) => v.text())
			// .then(v=>{document.write(v)})
			.then((v) => {
				state = `启动成功！ 欢迎使用Nomen代理 该代理由Q创立并维护,不承担任何法律责任,请自行承担使用过程中产生的任何问题`;
				srcdoc = v;
				err = '[错误]> 端点没有产生错误 =)';
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
	<input bind:value={password} type="password" />
	<input bind:value={src} />
	<button on:click={fetchHandler} {disabled}>
		{btcontent}
	</button>
</div>
<br />
<button
	on:click={() => {
		jtmessage = `使用Nomen获取网页元数据(仅HTML): 向/e7n3 POST json数据
    Promise {url, password} : text
    无需cookie, 令牌`;
	}}
>
	技术人员？
	<p>{jtmessage}</p>
</button>
<p>{state}</p>
<p>{err}</p>
<p>{message}</p>
<!-- <iframe class='ifr' src="about:blank" {srcdoc} border="0" frameborder="no" framespacing="0" allowfullscreen="true" height="800"> </iframe> -->
{@html srcdoc}

<!-- <iframe src="about:blank" {srcdoc} title="qwq" allowpaymentrequest="true" width="1000" height="800"></iframe> -->
<style>
	.ifr {
		width: 95%;
		height: 100%;
	}
</style>
