<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	let dropdownOpen = false;
	let filterBy = [];

	const dispatch = createEventDispatcher();

	const openDropdown = () => {
		dropdownOpen = !dropdownOpen;
	};

	const handleClickOutside = () => {
		if (!dropdownOpen) return;
		dropdownOpen = false;
	};

	function clickOutside(element: HTMLDivElement, callbackFunction) {
		function onClick(event) {
			if (!element.contains(event.target)) {
				callbackFunction();
			}
		}

		document.body.addEventListener('click', onClick);

		return {
			update(newCallbackFunction) {
				callbackFunction = newCallbackFunction;
			},
			destroy() {
				document.body.removeEventListener('click', onClick);
			}
		};
	}

	$: dispatch('filterBy', filterBy);
</script>

<div class="wrapper" use:clickOutside={handleClickOutside}>
	<div class="button" on:click={openDropdown}>
		<span>Filter by status</span>
		<img src="/icons/icon-arrow-down.svg" alt="Arrow icon" />
	</div>

	{#if dropdownOpen}
		<div class="dropdown" transition:fade={{ duration: 150 }}>
			<div class="dropdown__item">
				<input type="checkbox" id="draft" bind:group={filterBy} name="filter" value="draft" />
				<label for="draft"> Draft</label>
			</div>

			<div class="dropdown__item">
				<input type="checkbox" id="pending" bind:group={filterBy} name="filter" value="pending" />
				<label for="pending"> Pending</label>
			</div>

			<div class="dropdown__item">
				<input type="checkbox" id="paid" bind:group={filterBy} name="filter" value="paid" />
				<label for="paid"> Paid</label>
			</div>
		</div>
	{/if}
</div>

<style>
	.wrapper {
		position: relative;
	}
	span {
		font-weight: bold;
		color: #0c0e16;
		margin-right: 10px;
		font-size: 12px;
	}
	img {
		transform: rotate(-180deg);
	}
	.dropdown {
		background-color: #ffffff;
		padding: 24px;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
		display: flex;
		flex-direction: column;
		position: absolute;
		width: 200px;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 8px;
		font-weight: bold;
		z-index: 10;

		margin-top: 1rem;
	}
	/* .dropdown__item {
	} */

	input {
		appearance: none;
		position: relative;
		width: 16px;
		height: 16px;
		background-color: #dfe3fa;
		margin-right: 10px;
		border: 1px solid transparent;
	}
	input:hover {
		border: 1px solid #7c5dfa;
	}
	input:checked {
		background-color: #7c5dfa;
	}
	input:checked::before {
		content: url('/icons/icon-check.svg');
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.dropdown__item:not(:last-of-type) {
		margin-bottom: 10px;
	}
	.button {
		cursor: pointer;
	}
</style>
