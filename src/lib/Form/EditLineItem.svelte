<script lang="ts">
	import Input from './Input.svelte';
	import type { Items } from '../../routes/data';
	import Button from '$lib/Button.svelte';
	import { fade } from 'svelte/transition';

	export let editedItems: Array<Items> = [];

	const addLineItem = () => {
		editedItems = [...editedItems, {}];
	};

	const removeLineItem = (index: number) => {
		console.log(`Removing item ${editedItems[index].name} at index ${index}`);
		editedItems.splice(index, 1);
		editedItems = editedItems;

		console.log(editedItems);
	};
</script>

<div class="grid">
	<h4>Item Name</h4>
	<h4>Qty</h4>
	<h4>Price</h4>
	<h4>Total</h4>
	<div class="div" />
	{#if editedItems}
		{#each editedItems as item, index}
			<Input bind:value={item.name} />
			<Input bind:value={item.quantity} />
			<Input bind:value={item.price} />
			<span><b>{(item.total = item.quantity * item.price)}</b></span>
			<img src="/icons/icon-delete.svg" alt="Delete icon" on:click={() => removeLineItem(index)} />
		{/each}
	{:else}
		<h2>Add new items</h2>
	{/if}
</div>
<Button color="gray" on:click={addLineItem} fullWidth>Add New Item</Button>

<style>
	.grid {
		display: grid;
		grid-template-areas: 'item qty price total trashcan';
		column-gap: 20px;
		align-items: center;
	}
	.div {
		width: 0px;
	}
	.animation {
		position: absolute;
	}
</style>
