<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import { resolve } from '$app/paths';
	import '../app.css';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav aria-label="Main">
	<a href={resolve('/')}>Polls</a>
	<a href={resolve('/create')}>Create</a>
</nav>

{@render children()}

<style>
	nav {
		display: flex;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}
	nav a {
		text-decoration: none;
		color: #4f7bff;
		font-weight: 500;
	}
	nav a:hover {
		text-decoration: underline;
	}
</style>
