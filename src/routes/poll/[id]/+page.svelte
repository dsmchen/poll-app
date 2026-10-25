<script lang="ts">
	import type { Poll } from '#lib/data/polls.ts';
	import { SvelteSet } from 'svelte/reactivity';
	import { onMount } from 'svelte';
	import { reveal } from '#lib/transitions/reveal.ts';

	let { data }: { data: { poll: Poll } } = $props();

	const { poll } = data;

	let selectedIds = new SvelteSet<number>();
	let hasVoted = $state(false);
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	let totalVotes = $derived(poll.options.reduce((s, o) => s + o.votes, 0));
	let canVote = $derived(selectedIds.size > 0 && !hasVoted);

	function isMulti(): boolean {
		return poll.type === 'multi-choice';
	}

	function selectOption(id: number) {
		if (hasVoted) return;

		if (isMulti()) {
			if (selectedIds.has(id)) selectedIds.delete(id);
			else selectedIds.add(id);
		} else {
			selectedIds.clear();
			selectedIds.add(id);
		}
	}

	function vote() {
		if (selectedIds.size === 0 || hasVoted) return;
		for (const opt of poll.options) {
			if (selectedIds.has(opt.id)) opt.votes++;
		}
		hasVoted = true;
	}
</script>

{#if mounted}
	<div in:reveal>
		<h1>{poll.question}</h1>

		<p class="meta">
			<span class="type" data-type={poll.type}>{poll.type}</span>
			<span aria-hidden="true">·</span>
			<span>{totalVotes} total votes</span>
			<span aria-hidden="true">·</span>
			<span>closes {poll.deadline.slice(0, 10)}</span>
		</p>

		<div class="options" role="group" aria-label="Poll options">
			{#each poll.options as option (option.id)}
				{#if poll.type === 'rating'}
					<button
						type="button"
						class="option rating"
						class:selected={selectedIds.has(option.id)}
						aria-pressed={selectedIds.has(option.id)}
						disabled={hasVoted}
						onclick={() => selectOption(option.id)}
					>
						{'★'.repeat(option.id)} <span class="sr-only">Rate {option.id} out of 5</span>
					</button>
				{:else}
					<button
						type="button"
						class="option"
						class:selected={selectedIds.has(option.id)}
						aria-pressed={selectedIds.has(option.id)}
						disabled={hasVoted}
						onclick={() => selectOption(option.id)}
					>
						<span class="label">{option.text}</span>
					</button>
				{/if}
			{/each}
		</div>

		{#if !hasVoted}
			<button type="button" class="vote" disabled={!canVote} onclick={vote}>Vote</button>
		{:else}
			<p role="status" class="voted" in:reveal>You voted. Thank you!</p>
		{/if}
	</div>
{/if}

<style>
	.meta {
		display: flex;
		gap: 0.4rem;
		font-size: 0.85rem;
		color: #666;
		margin: 0 0 1rem;
	}

	.options {
		display: grid;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}
	.option {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		border: 1px solid #8884;
		border-radius: 8px;
		background: none;
		cursor: pointer;
		text-align: left;
	}
	.option.selected {
		border-color: #4f7bff;
		background: #4f7bff10;
	}
	.option.rating {
		font-size: 1.2rem;
		letter-spacing: 0.1em;
	}

	.option:disabled,
	.vote:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.vote {
		padding: 0.5rem 1.5rem;
		background: #4f7bff;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		margin-bottom: 1rem;
	}
	.voted {
		color: #16a34a;
		font-weight: 600;
		margin-bottom: 1rem;
	}
</style>
