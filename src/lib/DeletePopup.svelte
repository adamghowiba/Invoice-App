<script>
	import { createEventDispatcher } from 'svelte';

	import Button from './Button.svelte';

	export let title;
	export let body;

	const dispatch = createEventDispatcher();
</script>

<div class="wrapper">
	<h2>{title}</h2>
	<p>{body}</p>

	<div class="buttons">
		<Button color="gray" on:click={() => dispatch('onCancel')}>Cancel</Button>
		<Button color="red" on:click={() => dispatch('onDelete')}>Delete</Button>
	</div>
</div>

<style>
	.wrapper {
		position: absolute;
		background-color: white;
		padding: 48px;
		border-radius: 8px;
        z-index: 100;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
	}
	.buttons {
		display: flex;
		justify-content: right;
		gap: 1rem;
	}
	h2 {
		margin-bottom: 13px;
	}
	p {
		margin-bottom: 16px;
	}
</style>
