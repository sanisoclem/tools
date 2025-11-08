<script lang="ts" module>
	const data = {
		navMain: [
			{
				title: 'Tools',
				url: '/tools',
				items: [
					{
						title: 'Base58 Checker',
						url: '/tools/base58'
					},
					{
						title: 'Base58check Generator',
						url: '/tools/base58gen'
					}
				]
			},
			{
				title: 'Others',
				url: '#',
				items: [
					{
						title: 'SFX Generator',
						url: 'https://sfxr.pages.dev'
					},
					{
						title: 'VMCD',
						url: 'https://vmcd.pages.dev'
					},
					{
						title: 'Save? triangles',
						url: 'https://sanisoclem.itch.io/triangle-apocalypse'
					}
				]
			}
		]
	};
</script>

<script lang="ts">
	import { page } from '$app/state';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { BusFront, CodeXml } from '@lucide/svelte/icons';

	let { ref = $bindable(null), currentPage = $bindable(), ...restProps } = $props();

	$effect(() => {
		const flat = data.navMain.flatMap((n) => (n.items ? [n, ...n.items] : [n]));
		currentPage = flat.find((f) => f.url === page.url.pathname);
	});
</script>

<Sidebar.Root {...restProps} bind:ref>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="/" {...props}>
							<div
								class="flex aspect-square size-8 items-center justify-center rounded-lg bg-amber-500 text-sidebar-primary-foreground"
							>
								<BusFront class="size-7" />
							</div>
							<div class="flex flex-col gap-0.5 leading-none">
								<span class="font-medium">Stuff Directory</span>
								<span class="monospace text-xs tracking-widest text-zinc-400">v0.7-sigma</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.Menu>
				{#each data.navMain as item (item.title)}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton class="font-medium">
							{#snippet child({ props })}
								<a href={item.url} {...props}>
									{item.title}
								</a>
							{/snippet}
						</Sidebar.MenuButton>
						{#if item.items?.length}
							<Sidebar.MenuSub>
								{#each item.items as subItem (subItem.title)}
									<Sidebar.MenuSubItem>
										<Sidebar.MenuSubButton isActive={subItem.url === page.url.pathname}>
											{#snippet child({ props })}
												<a href={subItem.url} {...props}>{subItem.title}</a>
											{/snippet}
										</Sidebar.MenuSubButton>
									</Sidebar.MenuSubItem>
								{/each}
							</Sidebar.MenuSub>
						{/if}
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="https://github.com/sanisoclem/tools" {...props}>
							<div class="flex aspect-square size-8 items-center justify-center rounded-lg">
								<CodeXml class="size-6" />
							</div>
							<div class="flex flex-col gap-0.5 leading-none">
								<span class="font-medium">code</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
