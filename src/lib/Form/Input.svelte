<script lang="ts">
	export let name: string = null;
    export let value: string | number = null;
</script>

<div class="wrap">
    <label for={name}> <slot/> </label>
    <input type="text" {name} bind:value={value} />
</div>

<style>
    .wrap {
        display: flex;
        flex-direction: column;
    }
	label {
		color: #7e88c3;
		font-size: 12px;
        margin-bottom: 0.7rem;
	}
	input {
		color: #0c0e16;
		border: 1px solid #dfe3fa;
		font-weight: bold;
		font-size: 12px;
        border-radius: 4px;
        width: 100%;
        padding: 17px 20px;
        appearance: none;
        outline: none;


        transition: border 0.25s linear;
	}
    input:hover {
        border: 1px solid #7E88C3;
    }
    input:focus {
        border: 1px solid #7C5DFA;
    }
</style>
