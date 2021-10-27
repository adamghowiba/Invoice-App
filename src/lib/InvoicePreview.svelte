<script lang="ts">
	import Status from './Status.svelte';
	export let id;
	export let date;
	export let name;
	export let amount;
	export let status;

	function commaNumber(number: number) {
		if (!number) return 0;

		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
</script>

<a class="wrapper" href="/view/{id}">
	<span class="id bold"><span class="purple">#</span>{id}</span>
	<span class="date">{date}</span>
	<span>{name}</span>
	<span class="bold larger">${commaNumber(amount)}</span>
	<Status {status} />
	<img src="/icons/icon-arrow-right.svg" alt="Arrow Right" />
</a>

<style>
	.wrapper {
		background-color: white;
		box-shadow: rgba(0, 0, 0, 0.164) 0px 3px 8px;
		padding: 16px 16px;
		align-items: center;
		display: grid;
		grid-template-columns: 0.6fr 0.7fr 1fr 1fr 0.5fr 0.2fr;
		text-decoration: none;
		border-radius: 8px;
		position: relative;
	}
	span {
		color: #7e88c3;
	}
	img {
		justify-self: right;
	}
	/* .date, .id {
		margin-right: 20px;
	} */

	/* Stlying Classes */
	.purple {
		color: #7e88c3;
	}
	.bold {
		font-weight: bold;
		color: #0c0e16;
		text-transform: uppercase;
	}
	.larger {
		font-size: 16px;
	}
</style>
