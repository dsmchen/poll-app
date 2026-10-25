import type { TransitionConfig } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';

export function reveal(
	node: Element,
	params: {
		delay?: number;
		duration?: number;
		distance?: number;
		direction?: 'up' | 'down' | 'left' | 'right';
	} = {}
): TransitionConfig {
	const { delay = 0, duration = 420, distance = 28, direction = 'up' } = params;

	let x = 0;
	let y = 0;

	if (direction === 'left') x = distance;
	else if (direction === 'right') x = -distance;
	else if (direction === 'down') y = -distance;
	else if (direction === 'up') y = distance;

	return {
		delay,
		duration,
		easing: cubicOut,
		css: (t, u) => {
			return `
				opacity: ${t};
				transform: translate(${u * x}px, ${u * y}px) scale(${0.98 + t * 0.02});
				filter: blur(${u * 1.5}px);
      `;
		}
	};
}
