<script lang="ts">
	import { pixelIcons, type PixelIconName } from '$lib/pixelIcons';

	let { name, class: className = '' }: { name: PixelIconName; class?: string } = $props();

	const rows = $derived(pixelIcons[name]);
	const full = $derived(pathOf(rows, '#'));
	const dim = $derived(pathOf(rows, '+'));

	function pathOf(pattern: readonly string[], pixel: string): string {
		return pattern
			.flatMap((row, y) => [...row].map((cell, x) => (cell === pixel ? `M${x} ${y}h1v1h-1z` : '')))
			.join('');
	}
</script>

<svg
	viewBox="0 0 {rows[0].length} {rows.length}"
	class={className}
	fill="currentColor"
	shape-rendering="crispEdges"
	aria-hidden="true"
>
	<path d={full} />
	<path d={dim} opacity="0.45" />
</svg>
