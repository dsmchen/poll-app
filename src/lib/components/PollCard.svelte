<script lang="ts">
	import type { Poll } from '#lib/data/polls.ts';

	let { poll, onOpen }: { poll: Poll; onOpen: () => void } = $props();

	let totalVotes = $derived(poll.options.reduce((sum, o) => sum + o.votes, 0));
</script>

<article class="card">
	<button type="button" class="card-btn" onclick={onOpen}>
		<h2 class="question">{poll.question}</h2>
		<p class="meta">
			<span class="type" data-type={poll.type}>{poll.type}</span>
			<span aria-hidden="true">·</span>
			<span>{totalVotes} votes</span>
			<span aria-hidden="true">·</span>
			<span>closes {poll.deadline.slice(0, 10)}</span>
		</p>
	</button>
</article>

<style>
	.card-btn {
		width: 100%;
		padding: 1rem;
		border: 1px solid #8883;
		border-radius: 8px;
		background: none;
		cursor: pointer;
		text-align: left;
	}
	.card-btn:hover {
		background: #4f7bff08;
	}
	.question {
		font-size: 1rem;
		margin: 0 0 0.4rem;
	}
	.meta {
		display: flex;
		gap: 0.4rem;
		font-size: 0.85rem;
		color: #666;
		margin: 0;
	}
</style>
