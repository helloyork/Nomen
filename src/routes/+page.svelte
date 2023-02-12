<script>
	import { onMount } from 'svelte';

	onMount(() => {
		if (localStorage.getItem('username') === null || localStorage.getItem('password') === null){
			location.href = '/login';
		} else {
			location.href = '/home';
		}
	});
</script>
