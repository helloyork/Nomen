<script>
	import { onMount } from 'svelte';
	import { islogin } from '$lib/store';

	onMount(() => {
		if (localStorage.getItem('username') === null || localStorage.getItem('password') === null){
			location.href = '/login';
		} else {
			islogin.set(true);
			location.href = '/book';
		}
	});
</script>
