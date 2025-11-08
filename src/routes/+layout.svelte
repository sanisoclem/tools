<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import favicon from '$lib/assets/favicon.svg';
	import ThemeToggle from './theme-toggle.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from './app-sidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';

	let { children } = $props();
	let currentPage = $state<{ title: string } | null>(null);
</script>

<svelte:head>
	<title>Stuff Directory</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />

<Sidebar.Provider>
	<AppSidebar bind:currentPage />
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2 border-b">
			<div class="flex items-center gap-2 px-3">
				<Sidebar.Trigger />
				<ThemeToggle />
				<Separator orientation="vertical" class="mr-2 h-4" />
				{currentPage?.title}
			</div>
		</header>
		<div></div>
		{@render children()}
	</Sidebar.Inset>
</Sidebar.Provider>
