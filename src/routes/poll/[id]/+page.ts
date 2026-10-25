import { polls } from '#lib/data/polls.ts';
import type { Poll } from '#lib/data/polls.ts';

export function load({ params }): { poll: Poll } {
	const poll = polls.find((p) => p.id === Number(params.id));
	if (!poll) {
		throw new Error('Poll not found');
	}
	return { poll };
}
