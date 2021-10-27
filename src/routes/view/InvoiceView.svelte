<script lang="ts">
	import type { InvoiceData } from 'src/routes/data';
	import ItemTable from './ItemTable.svelte';

	export let client: InvoiceData;
</script>

<div class="heading">
	<div class="title">
		<h3 class="mg-btm"><span class="hashtag">#</span>{client?.id}</h3>
		<p>Graphc Design</p>
	</div>

	<div class="address">
		<p>{client?.senderAddress?.street}</p>
		<p>{client?.senderAddress?.city}</p>
		<p>{client?.senderAddress?.postCode}</p>
		<p>{client?.senderAddress?.country}</p>
	</div>
</div>

<div class="info">
	<div class="date">
		<div class="created">
			<h4 class="mg-btm-lg">Invoice Date</h4>
			<h3>{client?.createdAt}</h3>
		</div>
		<div class="due">
			<p class="mg-btm-lg">Payment Date</p>
			<h3>{client?.paymentDue}</h3>
		</div>
	</div>

	<div class="billTo">
		<h4 class="mg-btm-lg">Bill To</h4>
		<h3 class="mg-btm">{client?.clientName}</h3>
		<p>{client?.clientAddress.street}</p>
		<p>{client?.clientAddress.city}</p>
		<p>{client?.clientAddress.postCode}</p>
		<p>{client?.clientAddress.country}</p>
	</div>

	<div class="sentTo">
		<h4 class="mg-btm-lg">Sent to</h4>
		<h3>{client?.clientEmail}</h3>
	</div>
</div>
{#if client.items.length > 0}
	<ItemTable data={client.items} total={client.total} />
{/if}

<style>
	.heading {
		display: flex;
		justify-content: space-between;
		margin-bottom: 2rem;
	}
	.info {
		display: flex;
		justify-content: space-between;
		margin-bottom: 45px;
	}
	.date {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1rem;
	}

	h4 {
		color: #7e88c3;
		font-weight: normal;
	}

	.address p:not(:last-of-type),
	.billTo p:not(:last-of-type) {
		margin-bottom: 5px;
	}
	/* Utlity Classes */
	.hashtag {
		font-size: inherit;
	}
	.mg-btm {
		margin-bottom: 8px;
	}
	.mg-btm-lg {
		margin-bottom: 12px;
	}
	/* Reset */
	p {
		margin: 0;
	}
</style>
