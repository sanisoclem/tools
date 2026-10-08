<script lang="ts">
	import type { Snippet } from 'svelte';
	import LauncherTile from '$lib/components/LauncherTile.svelte';
	import type { Link } from '$lib/launcher';

	let {
		title,
		links,
		columns = 'sm:grid-cols-2 2xl:grid-cols-4',
		children
	}: { title: string; links: Link[]; columns?: string; children?: Snippet } = $props();
</script>

<section class="flex flex-col gap-5">
	<h2
		class="flex items-baseline gap-3 font-display text-xs tracking-widest text-muted-foreground uppercase"
	>
		{title}
		<span class="h-0.5 flex-1 translate-y-[-3px] bg-border"></span>
		<span class="tabular-nums">{String(links.length).padStart(2, '0')}</span>
	</h2>
	<div class="grid gap-7 {columns}">
		{#each links as link (link.url)}
			<LauncherTile {link} />
		{/each}
	</div>
	{@render children?.()}
</section>
