<script lang="ts">
	import LauncherSection from './launcher-section.svelte';
	import PixelIcon from '$lib/components/PixelIcon.svelte';
	import { games, ITCH_PROFILE, sites, tools } from '$lib/launcher';
</script>

<svelte:head>
	<title>Stuff Directory</title>
</svelte:head>

<div class="flex flex-col gap-12 p-6 md:p-10">
	<header class="flex flex-col gap-3">
		<h1 class="font-display text-2xl text-primary uppercase text-shadow-glow md:text-3xl">
			Stuff Directory
		</h1>
		<p class="max-w-prose text-xl text-muted-foreground">things?</p>
	</header>

	<LauncherSection title="Sites" links={sites} />

	<LauncherSection title="Game jam games" links={games} columns="sm:grid-cols-2 lg:grid-cols-3">
		<a
			href={ITCH_PROFILE}
			class="flex w-fit items-center gap-2 text-lg text-muted-foreground hover:text-primary"
		>
			itch.io <PixelIcon name="arrow" class="size-2.5" />
		</a>
	</LauncherSection>

	<LauncherSection title="Tools" links={tools} />
</div>
