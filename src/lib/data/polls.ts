export type PollType = 'single-choice' | 'multi-choice' | 'rating';

export interface PollOption {
	id: number;
	text: string;
	votes: number;
}

export interface Poll {
	id: number;
	question: string;
	type: PollType;
	created: string;
	deadline: string;
	options: PollOption[];
}

export const polls: Poll[] = [
	{
		id: 1,
		question: 'What should we name the new feature?',
		type: 'single-choice',
		created: '2026-10-20T09:00:00Z',
		deadline: '2026-10-27T09:00:00Z',
		options: [
			{ id: 1, text: 'Turbo', votes: 12 },
			{ id: 2, text: 'Bolt', votes: 8 },
			{ id: 3, text: 'Dash', votes: 15 }
		]
	},
	{
		id: 2,
		question: 'Which features do you want in v2? (select all that apply)',
		type: 'multi-choice',
		created: '2026-10-22T14:30:00Z',
		deadline: '2026-10-28T14:30:00Z',
		options: [
			{ id: 1, text: 'Dark mode', votes: 22 },
			{ id: 2, text: 'Keyboard shortcuts', votes: 17 },
			{ id: 3, text: 'Export to CSV', votes: 9 },
			{ id: 4, text: 'Offline mode', votes: 14 }
		]
	},
	{
		id: 3,
		question: 'How would you rate the onboarding experience?',
		type: 'rating',
		created: '2026-10-18T08:00:00Z',
		deadline: '2026-10-24T08:00:00Z',
		options: [
			{ id: 1, text: '1', votes: 2 },
			{ id: 2, text: '2', votes: 4 },
			{ id: 3, text: '3', votes: 11 },
			{ id: 4, text: '4', votes: 18 },
			{ id: 5, text: '5', votes: 9 }
		]
	},
	{
		id: 4,
		question: 'Best time slot for the demo?',
		type: 'single-choice',
		created: '2026-10-25T10:00:00Z',
		deadline: '2026-10-26T10:00:00Z',
		options: [
			{ id: 1, text: 'Mon 10:00', votes: 6 },
			{ id: 2, text: 'Mon 14:00', votes: 11 },
			{ id: 3, text: 'Tue 10:00', votes: 4 }
		]
	},
	{
		id: 5,
		question: 'How would you rate the new dashboard layout?',
		type: 'rating',
		created: '2026-10-23T12:00:00Z',
		deadline: '2026-10-29T12:00:00Z',
		options: [
			{ id: 1, text: '1', votes: 1 },
			{ id: 2, text: '2', votes: 3 },
			{ id: 3, text: '3', votes: 7 },
			{ id: 4, text: '4', votes: 12 },
			{ id: 5, text: '5', votes: 5 }
		]
	}
];
