<script lang="ts">
	import type { Poll } from '#lib/data/polls.ts';

	let { poll }: { poll: Poll } = $props();

	let total = $derived(poll.options.reduce((s, o) => s + o.votes, 0));
	let leaderId = $derived.by(() => {
		if (total === 0) return -1;
		let max = -1;
		let id = poll.options[0]?.id ?? 0;
		for (const o of poll.options) {
			if (o.votes > max) {
				max = o.votes;
				id = o.id;
			}
		}
		return id;
	});
	let avgRating = $derived.by(() => {
		if (poll.type !== 'rating' || total === 0) return 0;
		return poll.options.reduce((sum, o) => sum + o.id * o.votes, 0) / total;
	});

	const BAR_COLOR = '#4f7bff';
	const LEADER_COLOR = '#2547d4'; // darker variant for the winner
</script>

<div class="results" role="img" aria-label="Poll results">
	{#if poll.type === 'rating'}
		<p class="avg" aria-live="polite">
			Average: <strong>{avgRating.toFixed(1)}</strong> / 5
		</p>
	{/if}

	{#each poll.options as option (option.id)}
		<div class="bar-row">
			<span class="label">{option.text}</span>
			<div class="track">
				<div
					class="bar"
					class:leader={leaderId !== -1 && option.id === leaderId}
					style:width={total > 0 ? (option.votes / total) * 100 + '%' : '0%'}
					style:background={option.id === leaderId ? LEADER_COLOR : BAR_COLOR}
				></div>
			</div>
			<span class="count" aria-hidden="true">
				{option.votes}
				<span class="pct">
					{total > 0 ? Math.round((option.votes / total) * 100) : 0}%
				</span>
			</span>
		</div>
	{/each}
</div>

<style>
	.results {
		display: grid;
		gap: 0.6rem;
	}
	.avg {
		margin: 0 0 0.5rem;
		font-size: 1rem;
	}
	.bar-row {
		display: grid;
		grid-template-columns: 7rem 1fr 4rem;
		align-items: center;
		gap: 0.5rem;
	}
	.label {
		font-size: 0.9rem;
		text-align: right;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.track {
		height: 1.25rem;
		background: #eee;
		border-radius: 4px;
		overflow: hidden;
	}
	.bar {
		height: 100%;
		border-radius: 4px;
		transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
	}
	.count {
		font-size: 0.85rem;
		color: #666;
		text-align: right;
	}
	.pct {
		color: #767676;
		font-size: 0.8rem;
		margin-left: 0.2rem;
	}
</style>
