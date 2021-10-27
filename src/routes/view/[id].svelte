<!-- Currently we have to pass down the entire data object.
- Can we just pass down the client?
- Error: Was getting undefined at DOM level.
-->
<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ page }) => {
		const invoiceID = page.params.id;

		return {
			props: {
				id: invoiceID
			}
		};
	};
</script>

<script lang="ts">
	import Status from '$lib/Status.svelte';
	import type { InvoiceData } from 'src/routes/data';
	import Button from '$lib/Button.svelte';
	import InvoiceView from './InvoiceView.svelte';
	import InvoiceSidebar from '$lib/InvoiceSidebar.svelte';
	import { invoiceData, overlay } from '$lib/stores';
	import { sidebarOpen } from '$lib/stores';
	import { goto } from '$app/navigation';
	import DeletePopup from '$lib/DeletePopup.svelte';

	export let id;
	let showDeletePopup = false;
	let invoiceIndex = $invoiceData.findIndex((elem) => elem.id == id);

	const handleEditClck = () => {
		$sidebarOpen = !$sidebarOpen;
	};

	const saveFormData = (event) => {
		$invoiceData[invoiceIndex] = event.detail;
	};

	const changeStatus = () => {
		switch (client.status) {
			case 'paid':
				client.status = 'pending';
				break;
			case 'pending':
				client.status = 'paid';
				break;
			case 'draft':
				client.status = 'pending';
				break;
		}
		$invoiceData[invoiceIndex].status = client.status;
	};

	const toggleDeletePromopt = () => {
		showDeletePopup = !showDeletePopup;
		$overlay = !$overlay;
	};
	
	const deletePopup = () => {
		$invoiceData.splice(invoiceIndex, 1);
		$invoiceData = $invoiceData;
		toggleDeletePromopt();
		goto('/', {replaceState: true});
	}

	$: if (!$overlay) showDeletePopup = false;
	$: client = $invoiceData[invoiceIndex];
</script>

{#if showDeletePopup}
	<DeletePopup
		title="Confirm Deletoon"
		body="Are you sure you want to delete invoice #XM9141? This action cannot be undone."
		on:onCancel={toggleDeletePromopt}
		on:onDelete={deletePopup}
		/>
{/if}

<!-- TODO: Back Button -->
<InvoiceSidebar {client} on:formSave={saveFormData} />

<!-- TODO: Create Paper Componot -->
<div class="paper">
	<div class="heading-wrapper">
		<span>Status</span>
		<Status status={client.status} />

		<div class="buttons">
			<Button color="gray" on:click={handleEditClck}>Edit</Button>
			<Button color="red" on:click={toggleDeletePromopt}>Delete</Button>
			<Button color="purple" on:click={changeStatus}>
				Mark as {['paid', 'draft'].includes(client.status) ? 'Pending' : 'Paid'}
			</Button>
		</div>
	</div>
</div>

<div class="paper paper--invoice">
	<InvoiceView {client} />
</div>

<style>
	.paper {
		box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
		border-radius: 8px;
	}
	.paper--invoice {
		padding: 45px;
	}
	.heading-wrapper {
		display: flex;
		align-items: center;
		padding: 20px 32px;
		margin-bottom: 2rem;
	}
	.heading-wrapper span {
		margin-right: 10px;
	}
	.buttons {
		margin-left: auto;
		display: flex;
		gap: 1rem;
	}
</style>
