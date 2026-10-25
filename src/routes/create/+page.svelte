<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { polls } from '#lib/data/polls.ts';
	import type { Poll, PollOption, PollType } from '#lib/data/polls.ts';

	let question = $state('');
	let type = $state<PollType>('single-choice');
	let deadline = $state('');
	let optionTexts = $state<string[]>(['', '']);
	let error = $state<string | null>(null);

	const TYPES: PollType[] = ['single-choice', 'multi-choice', 'rating'];

	function isRating(): boolean {
		return type === 'rating';
	}

	function addOption() {
		optionTexts.push('');
	}

	function removeOption(index: number) {
		optionTexts.splice(index, 1);
	}

	function buildOptions(): PollOption[] {
		// Rating polls always have 1–5; no need to enter them.
		if (isRating()) {
			return [1, 2, 3, 4, 5].map((n) => ({ id: n, text: String(n), votes: 0 }));
		}
		return optionTexts
			.map((t) => t.trim())
			.filter((t) => t.length > 0)
			.map((text, i) => ({ id: i + 1, text, votes: 0 }));
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = null;

		const questionText = question.trim();
		if (!questionText) {
			error = 'Enter a question.';
			return;
		}

		const options = buildOptions();
		if (!isRating() && options.length < 2) {
			error = 'Add at least two options.';
			return;
		}

		const newPoll: Poll = {
			id: polls.reduce((max, p) => Math.max(max, p.id), 0) + 1,
			question: questionText,
			type,
			created: new Date().toISOString(),
			deadline,
			options
		};

		polls.push(newPoll);
		await goto(resolve('/poll/[id]', { id: String(newPoll.id) }));
	}
</script>

<h1>Create a poll</h1>

<form onsubmit={handleSubmit}>
	<div class="field">
		<label for="q">Question</label>
		<input type="text" id="q" bind:value={question} required />
	</div>

	<div class="field">
		<label for="type">Type</label>
		<select id="type" bind:value={type}>
			{#each TYPES as t (t)}
				<option value={t}>{t}</option>
			{/each}
		</select>
	</div>

	<div class="field">
		<label for="deadline">Closes on</label>
		<input type="date" id="deadline" bind:value={deadline} required />
	</div>

	{#if !isRating()}
		<fieldset class="field">
			<legend>Options</legend>
			{#each optionTexts, i (i)}
				<div class="option-row">
					<input type="text" bind:value={optionTexts[i]} aria-label={`Option ${i + 1}`} />
					{#if optionTexts.length > 2}
						<button
							type="button"
							class="remove"
							aria-label={`Remove option ${i + 1}`}
							onclick={() => removeOption(i)}>×</button
						>
					{/if}
				</div>
			{/each}
			<button type="button" class="add" onclick={addOption}>+ Add option</button>
		</fieldset>
	{/if}

	{#if error}
		<p class="error" role="alert">{error}</p>
	{/if}

	<button type="submit" class="create-poll">Create poll</button>
</form>

<style>
	.field {
		margin-bottom: 1rem;
		display: grid;
		gap: 0.4rem;
	}
	.field input[type='text'],
	.field select,
	.field input[type='date'] {
		padding: 0.5rem;
		border: 1px solid #8884;
		border-radius: 6px;
	}
	fieldset {
		border: none;
		padding: 0;
	}
	legend {
		margin-bottom: 0.4rem;
	}
	.option-row {
		display: flex;
		gap: 0.4rem;
		margin-bottom: 0.4rem;
	}
	.option-row input {
		flex: 1;
	}
	.remove {
		border: none;
		background: none;
		color: #c44;
		font-size: 1.2rem;
		cursor: pointer;
		padding: 0 0.4rem;
	}
	.add {
		padding: 0.4rem 0.8rem;
		border: 1px dashed #8884;
		border-radius: 6px;
		background: none;
		cursor: pointer;
	}
	.error {
		color: #a33;
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
	}
	.create-poll {
		padding: 0.5rem 1.5rem;
		background: #4f7bff;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		margin-bottom: 1rem;
	}
</style>
