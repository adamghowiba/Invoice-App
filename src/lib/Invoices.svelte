<script lang="ts">
	import Filter from './Filter.svelte';
	import InvoicePreview from './InvoicePreview.svelte';
	import { invoiceData, sidebarOpen } from '$lib/stores';
	import Button from './Button.svelte';
	import InvoiceSidebar from './InvoiceSidebar.svelte';
	import { empetyObject } from '../routes/data';
	let filterBy: Array<string> = [];

	const addNewInvoice = (event) => {
		$invoiceData = [...$invoiceData, event.detail];
		$sidebarOpen = false;
	};

	/* TODO: Sort by added order of filter */
	$: sortedData = $invoiceData.sort((a) => {
		if (a.status == 'pending') {
			return -1;
		}
		if (a.status == 'draft') {
			return 1;
		}
	});
	$: filteredData =
		filterBy.length > 0 ? sortedData.filter((val) => filterBy.includes(val.status)) : sortedData;
	$: console.log('Data' + $invoiceData);
</script>

<InvoiceSidebar client={empetyObject} on:formSave={addNewInvoice} />

<!-- Heading Section -->
<div class="heading-wrapper">
	<div class="title">
		<h1>Invoices</h1>
		<span>There {$invoiceData.length == 1 ? 'is' : 'are'} {$invoiceData.length} toal invoices</span>
	</div>

	<Button icon color="purple" on:click={() => ($sidebarOpen = true)}>Add New</Button>
	<Filter on:filterBy={(event) => (filterBy = event.detail)} />
</div>

<!-- TODO: Move to seperate comp -->
{#if filteredData.length > 0}
	<div class="invoice-wrapper">
		{#each filteredData as data}
			<InvoicePreview
				id={data?.id}
				date={data?.createdAt}
				name={data?.clientName}
				amount={data?.total}
				status={data?.status}
			/>
		{/each}
	</div>
{:else}
	<!-- If Nothing Appears -->
	<div class="nothing-wrapper">
		<img src="/images/illustration-empty.svg" alt="Empty Illustration" />
		<h2>There is nothing here</h2>
		<p>
			Create an invoice by clicking the
			<b>New Invoice</b> button and get started
		</p>
	</div>
{/if}

<style>
	.heading-wrapper {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;
	}
	.invoice-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.nothing-wrapper {
		margin-top: 4rem;
		text-align: center;
	}
	.nothing-wrapper p {
		max-width: 20ch;
		margin: 1rem auto;
	}
	.nothing-wrapper img {
		margin-bottom: 2rem;
	}
	.title {
		display: flex;
		flex-direction: column;
		margin-right: auto;
	}
</style>
