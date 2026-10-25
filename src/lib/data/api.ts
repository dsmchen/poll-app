import type { Poll } from './polls';
import { polls } from './polls';

// The 800ms delay lets you see the loading state.
// In a real app this would be fetch('/api/polls').
export function fetchPolls(): Promise<Poll[]> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(polls), 800);
	});
}
