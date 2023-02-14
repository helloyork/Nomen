<script>
	//@ts-nocheck
	export let data;
	import { islogin } from '$lib/store';
	import { onMount } from 'svelte';
	// import sdk from "$lib/sdk.spotify"

	let wrong = false;

	async function getAccessKey(username, password) {
		return new Promise((resolve, reject) => {
			fetch('/api/player', { method: 'POST', body: JSON.stringify({ username, password }) })
				.then((v) => v.json())
				.then((v) => {
					if (!v) reject(false);
					else resolve(v);
				});
		});
	}

	async function connect(token) {
		// await import("$lib/sdk.spotify");
		const script = document.createElement('script');
		script.src = 'https://sdk.scdn.co/spotify-player.js';
		script.async = true;
		document.body.appendChild(script);

		// Wait for Spotify Web Playback SDK to load
		await new Promise((resolve) => {
			script.onload = resolve;
			script.onerror = () => {
				console.error('Failed to load Spotify Web Playback SDK');
				resolve();
			};
		});
		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new Spotify.Player({
				name: 'Web Playback SDK Quick Start Player',
				getOAuthToken: (cb) => {
					cb(token);
				}
			});
			console.log('init');
			// Error handling
			player.addListener('initialization_error', ({ message }) => {
				console.error(message);
			});
			player.addListener('authentication_error', ({ message }) => {
				console.error(message);
			});
			player.addListener('account_error', ({ message }) => {
				console.error(message);
			});
			player.addListener('playback_error', ({ message }) => {
				console.error(message);
			});
			// Playback status updates
			player.addListener('player_state_changed', (state) => {
				console.log(state);
			});
			// Ready
			player.addListener('ready', ({ device_id }) => {
				console.log('Ready with Device ID', device_id);
			});
			// Not Ready
			player.addListener('not_ready', ({ device_id }) => {
				console.log('Device ID has gone offline', device_id);
			});
			// Connect to the player!
			player.connect();
		};
	}

	onMount(() => {
		if (data.result) {
			getAccessKey(localStorage.getItem('username'), localStorage.getItem('password'))
				.then((v) => {
					console.log(v);
					connect(v.result);
				})
				.catch(() => {
					wrong = true;
				});
		}
	});
</script>

{#if islogin}
	{#if !data.result}
		<h6>Error</h6>
		<h6>这可能发生了一些错误，请传入正确的参数</h6>
	{/if}
	{#if wrong}
		<h6>Error</h6>
		<h6>无效登录</h6>
	{/if}
{/if}
