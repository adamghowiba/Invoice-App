<script lang="ts">
	import type { Items } from 'src/routes/data';
	export let data: Array<Items>;
	export let total = 0;
</script>

<!-- TODO: Make its own comp -->
<div class="items">
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Quantity</th>
				<th>Price</th>
				<th>Total</th>
			</tr>
		</thead>
		<tbody>
			{#each data as lineItem}
				<tr>
					<td>{lineItem.name}</td>
					<td>{lineItem.quantity}</td>
					<td>{lineItem.price}</td>
					<td>{lineItem.quantity * lineItem?.price}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<div class="total">
	<span>Amount Due</span>
	<h2>{total}</h2>
	<!-- <h2>$ {client.total}</h2> -->
</div>

<style>
	/* TABLE CSS TO BE EXTRACTED */
	.items {
		background-color: #f9fafe;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
		padding: 25px;
	}

	table {
		width: 100%;
	}
	thead tr {
		border: 1px solid red;
	}
	thead th {
		color: #7e88c3;
		font-size: 12px;
		font-weight: 500;
		text-align: right;
		text-transform: capitalize;
	}
	thead th:first-child {
		text-align: left;
	}
	tbody td {
		text-align: right;
	}
	tbody td:first-child {
		text-align: left;
	}
	td,
	th {
		padding: 1rem 0;
	}
	td {
		font-weight: bold;
		font-size: 12px;
	}

	/* Total CSS */
	.total {
		background-color: #373b53;
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
		padding: 32px 24px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.total h2 {
		color: white;
	}
	.total span {
		color: white;
	}
</style>
