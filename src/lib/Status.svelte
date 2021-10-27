<script lang="ts">
	type InvoiceStatus = 'paid' | 'pending' | 'draft';
	export let status: InvoiceStatus | string = 'pending';
	const statusColor = {
		paid: '#33D69F',
		pending: '#FF8F00',
		draft: '#373B53'
	};
</script>

<div class="status status--{status}">
	<div class="circle" style="background-color: {statusColor[status]}" />
	<span style="color: {statusColor[status]}">{status}</span>
</div>

<style>
	.status {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 104px;
		height: 40px;
		border-radius: 6px;
		color: inherit;
		font-weight: bold;
		text-transform: capitalize;
		position: relative;
		gap: 5px;
		line-height: 5px;
	}
	.status--pending {
		background-color: rgba(255, 145, 0, 0.142);
	}
	.status--draft {
		background-color: rgba(55, 59, 83, 0.142);
	}
	.status--paid {
		background-color: rgba(51, 214, 160, 0.142);
	}
	.circle {
		background-color: inherit;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		opacity: 1;
	}
</style>
