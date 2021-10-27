<script>
	import Sidebar from '$lib/Sidebar.svelte';
	import { overlay, sidebarOpen } from '$lib/stores';
	import { fade } from 'svelte/transition';

	const closePopups = () => {
		if ($sidebarOpen) $sidebarOpen = false;
		if ($overlay) $overlay = false;
	};
</script>

<main>
	<div class="sidebar-warp">
		<Sidebar />
	</div>

	<!-- TODO Extra nesting I think -->
	<div class="body" class:disableScroll={$sidebarOpen}>
		{#if $sidebarOpen || $overlay}
			<div class="overlay" transition:fade={{ duration: 400 }} on:click={closePopups} />
		{/if}
		<div class="container">
			<slot />
		</div>
	</div>
</main>

<style>
	main {
		display: grid;
		height: 100%;
		grid-template-columns: 103px 1fr;
	}
	.body {
		width: 100%;
		justify-self: center;
		position: relative;
	}
	.disableScroll {
		overflow-y: hidden;
	}
	.container {
		max-width: 900px;
		display: block;
		margin: 0 auto;
		padding: 60px;
	}
	.overlay {
		background-color: rgba(0, 0, 0, 0.246);
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}
</style>
