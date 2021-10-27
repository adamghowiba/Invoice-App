<script>
	import { darkmode } from './stores';

	const toggleDarkMode = () => {
		$darkmode = !$darkmode;
		console.log('Set darkmode to', $darkmode);
	};
</script>

<div class="sidebar">
	<div class="logo">
		<div class="logo__bottom" />
		<img src="/images/logo.svg" alt="Logo" />
	</div>

	<div class="bottom">
		<img on:click={toggleDarkMode} src="/icons/icon-moon.svg" alt="Moon Icon" />
		<div class="line" />
		<img src="/images/image-avatar.jpg" alt="Avatar" class="avatar" />
	</div>
</div>

<style>
	.sidebar {
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
		background-color: #373b53;
		width: 103px;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 2rem;
		position: fixed;
	}
	.logo {
		position: relative;
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		background-color: #7c5dfa;
		border-top-right-radius: inherit;
		border-bottom-right-radius: inherit;
		height: 103px;
	}
	.logo img {
		position: relative;
		width: 40px;
		height: 40px;
	}
	.logo__bottom {
		position: absolute;
		z-index: 0;
		bottom: 0px;
		height: 50%;
		width: 100%;
		border-top-left-radius: 20px;
		background-color: #9277ff;
	}

	.bottom {
		display: flex;
		gap: 1.5rem;
		align-items: center;
		flex-direction: column;
		width: 100%;
	}

	.line {
		display: block;
		height: 2px;
		width: 100%;
		background-color: #494e6e;
	}
	.avatar {
		border-radius: 50%;
		width: 40px;
		height: 40px;
	}
</style>
