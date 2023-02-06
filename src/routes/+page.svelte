<script>
    onMount(() => {
		state = '端点初始化完成';
		disabled = false;
		pageurl = new URL(window.location.href);
		if (localStorage.getItem('username') === null || localStorage.getItem('password') === null)
			location.href = '/login';
		else {
			location.href = '/book';
		}
	});
</script>