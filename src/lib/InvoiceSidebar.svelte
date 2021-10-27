<script lang="ts">
	import { fade, slide, fly } from 'svelte/transition';
	import FormGroup from './Form/FormGroup.svelte';
	import Input from './Form/Input.svelte';
	import { invoiceData, sidebarOpen } from './stores';
	import type { InvoiceData } from '../routes/data';
	import { empetyObject } from '../routes/data';
	import Button from './Button.svelte';
	import EditLineItem from './Form/EditLineItem.svelte';
	import type { Items } from '../routes/data';
	import { createEventDispatcher } from 'svelte';

	export let client: InvoiceData;
	let editedItems = client ? [...client.items] : [];
	const dispatch = createEventDispatcher();

	const handleSidebarClose = () => {
		$sidebarOpen = false;
	};

	const handleCancel = () => {
		// Reset editing items
		editedItems = [...client.items];
		$sidebarOpen = false;
	};

	function calcInvoiceTotal(items: Array<Items>) {
		let total = 0;
		items.forEach((item) => (total += item.total));

		return total;
	}

	/* Handle Form submission of inputs */
	function submitForm(event): void {
		const formData = new FormData(event.target);

		formData.forEach((value, key) => {
			let nestedValue = key.split('_')[1];

			if (key.startsWith('sender')) {
				client.senderAddress[nestedValue] = value;
				return;
			}

			if (key.startsWith('customer')) {
				client.clientAddress[nestedValue] = value;
				return;
			}

			/* Check if the input key is in the object */
			if (key && client[key] != null) {
				client[key] = value;
			} else {
				console.log(key + ' not found');
			}
		});

		$sidebarOpen = false;
		client.items = editedItems;
		client.total = calcInvoiceTotal(client.items);
		dispatch('formSave', client);
	}
</script>

{#if $sidebarOpen}

	<!-- TODO: Flatter design would be nice here. -->
	<div class="sidebar" transition:fly={{ duration: 400, x: -100 }}>
		<h2>Edit <span class="hashtag">#</span>123012</h2>

		<form on:submit|preventDefault={submitForm}>
			<h4>Bill From</h4>
			<Input value={client?.senderAddress.street} name="sender_street">Street Address</Input>
			<FormGroup>
				<Input name="sender_city" value={client?.senderAddress?.city}>Street</Input>
				<Input name="sender_postCode" value={client?.senderAddress?.postCode}>Post Code</Input>
				<Input name="sender_country" value={client?.senderAddress?.country}>Country</Input>
			</FormGroup>

			<h4>Bill To</h4>
			<Input name="clientName" value={client?.clientName}>Client's Name</Input>
			<Input name="clientEmail" value={client?.clientEmail}>Client's Email</Input>
			<Input name="customer_street" value={client?.clientAddress.street}>Street</Input>
			<FormGroup>
				<Input name="customer_city" value={client?.clientAddress?.city}>City</Input>
				<Input name="customer_postCode" value={client?.clientAddress?.postCode}>Postal</Input>
				<Input name="customer_country" value={client?.clientAddress?.country}>Country</Input>
			</FormGroup>

			<h4>Terms</h4>
			<FormGroup>
				<Input name="createdAt" value={client?.createdAt}>Invoice Date</Input>
				<Input name="paymentTerms" value={client?.paymentTerms.toString()}>Payment Terms</Input>
			</FormGroup>
			<Input name="description" value={client?.description}>Description</Input>

			<EditLineItem bind:editedItems />

			<div class="buttons">
				<Button color="red" on:click={handleCancel}>Cancel</Button>
				<Button type="submit" color="purple">Submit</Button>
			</div>
		</form>
	</div>
{/if}

<style>
	.sidebar {
		background-color: white;
		height: 100%;
		position: absolute;
		width: auto;
		top: 0;
		left: 0;
		z-index: 10;
		padding: 56px;
		overflow-y: auto;
		max-width: 600px;
	}
	.buttons {
		display: flex;
		gap: 1rem;
		justify-content: right;
	}
	h4 {
		color: #7c5dfa;
		margin-top: 48px;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 25px;
	}

	.hashtag {
		color: #888eb0;
		font-size: inherit;
	}
</style>
