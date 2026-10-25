<script lang="ts">
	import { fetchPolls } from '#lib/data/api.ts';
	import PollCard from '#lib/components/PollCard.svelte';

	let pollsPromise = $state(fetchPolls());
</script>

<h1>Polls</h1>

{#await pollsPromise}
	<p class="loading" role="status">Loading polls...</p>
{:then pollList}
	<ul class="poll-list" role="list">
		{#each pollList as poll (poll.id)}
			<li><PollCard {poll} /></li>
		{/each}
	</ul>
{:catch error}
	<div class="error" role="alert">
		<p>Something went wrong: {error.message}</p>
		<button type="button" onclick={() => (pollsPromise = fetchPolls())}>Retry</button>
	</div>
{/await}

<style>
	.poll-list {
		list-style: none;
		padding: 0;
		display: grid;
		gap: 0.75rem;
	}
	.loading {
		padding: 1rem 0;
		color: #666;
	}
	.error {
		padding: 1rem 0;
		color: #a33;
	}
	.error button {
		margin-top: 0.5rem;
		padding: 0.4rem 1rem;
		border: 1px solid #a33;
		border-radius: 6px;
		background: none;
		cursor: pointer;
	}
</style>
