<script>
	import { onMount } from 'svelte';

    onMount(()=>{
        if(localStorage.getItem('username')===null||localStorage.getItem('username')===undefined)location.href='/';
        else location.href='/book';
    })
</script>