<script lang="ts">
	import PixelIcon from './PixelIcon.svelte';
	import { isExternal, type Link } from '$lib/launcher';

	let { link }: { link: Link } = $props();

	const external = $derived(isExternal(link));
	const meta = $derived(link.badge ?? (external ? new URL(link.url).host : null));
</script>

<a
	href={link.url}
	class="group flex h-full flex-col bg-card text-card-foreground pixel-frame transition-transform outline-none hover:-translate-x-0.5 hover:-translate-y-0.5 hover:[--frame-color:var(--color-primary)] focus-visible:[--frame-color:var(--color-ring)] active:translate-x-px active:translate-y-px"
>
	{#if link.cover}
		<img
			src={link.cover}
			alt=""
			loading="lazy"
			class="aspect-[315/250] w-full border-b-[3px] border-[var(--frame-color)] object-cover [image-rendering:pixelated]"
		/>
	{/if}
	<span class="flex flex-1 gap-4 p-4">
		{#if !link.cover}
			<span
				class="flex size-14 shrink-0 items-center justify-center bg-accent text-accent-foreground"
			>
				<PixelIcon name={link.icon} class="size-9" />
			</span>
		{/if}
		<span class="flex min-w-0 flex-col gap-1">
			<span
				class="font-display text-sm text-primary uppercase transition-[text-shadow] group-hover:text-shadow-glow"
			>
				{link.title}
			</span>
			{#if link.blurb}
				<span class="text-lg leading-tight text-muted-foreground">{link.blurb}</span>
			{/if}
			{#if meta}
				<span class="mt-auto flex items-center gap-2 pt-1 text-base text-muted-foreground/80">
					<span class="truncate">{meta}</span>
					{#if external}<PixelIcon name="arrow" class="size-2.5 shrink-0" />{/if}
				</span>
			{/if}
		</span>
	</span>
</a>
