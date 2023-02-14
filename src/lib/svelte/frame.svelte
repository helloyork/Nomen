<script>
	import { islogin } from '$lib/store';
	import { fade } from 'svelte/transition';
	import { circOut } from 'svelte/easing';
</script>

{#if $islogin}
	<div transition:fade={{ duration: 200, easing: circOut }} />
{/if}
