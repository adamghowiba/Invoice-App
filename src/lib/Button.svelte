<script lang="ts">
	type Color = 'gray' | 'red' | 'purple';

	export let href: string | null = null;
	export let color: Color = 'gray';
	export let fullWidth = false;
	export let type = 'button';
	export let icon = false;
</script>

{#if href}
	<a class={color} {href}><slot /></a>
{:else}
	<button {type} class={color} class:sm-pd={icon} class:full-width={fullWidth} on:click>
		{#if icon}
			<div class="icon">
				<img src="/icons/icon-plus.svg" alt="Plus Icon" />
			</div>
		{/if}
		<slot />
	</button>
{/if}

<style>
	a,
	button {
		background-color: bisque;
		padding: 15px;
		color: white;
		border-radius: 30px;
		font-weight: bold;
		display: flex;
		justify-content: center;
		align-items: center;

		transition: background-color 0.25s linear, color 0.25s linear;
	}
	.sm-pd {
		padding: 8px 15px;
	}
	.icon {
		margin-right: 25px;
		width: 32px;
		height: 32px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		border-radius: 50%;
	}
	button {
		outline: none;
		border: none;
		appearance: none;
	}
	:global(.darkmode) a {
		background-color: red;
	}

	/* Button Colors */
	.red {
		background-color: #ec5757;
	}
	.purple {
		background-color: #7c5dfa;
	}
	.gray {
		background-color: #f9fafe;
		color: #7e88c3;
	}
	:global(.darkmode) .gray {
		background-color: #252945;
		color: white;
	}
</style>
