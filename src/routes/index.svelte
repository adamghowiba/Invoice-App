<script>
	import { darkmode } from '$lib/stores';
	import { onMount } from 'svelte';
	import Invoices from '$lib/Invoices.svelte';
	import { browser } from '$app/env';
	import { invoiceData } from '$lib/stores';
	let rendered;

	onMount(() => {
		rendered = true;
	});

	// if (browser) {
	// 	invoiceData.subscribe((val) => {
	// 		localStorage.setItem('data', JSON.stringify(val));
	// 		console.log('Updated data');
	// 	});
	// }

	$: if (rendered && $darkmode != null) {
		document.body.classList.toggle('darkmode');
	}
</script>

{#if browser}
	<Invoices />
{/if}

<style>
	:global(body) {
		transition: background-color 0.25s linear, color 0.2s linear;
	}
	:global(.darkmode) {
		background-color: black;
		color: white;
	}
</style>
