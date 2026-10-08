<script lang="ts" module>
	import { games, ITCH_PROFILE, sites, tools, type Link } from '$lib/launcher';

	const home: Link = { title: 'Launcher', url: '/', icon: 'bus' };

	const groups = [
		{ title: 'Tools', url: '/tools', items: tools },
		{ title: 'Sites', url: '/', items: sites },
		{ title: 'Games', url: ITCH_PROFILE, items: games }
	];
</script>

<script lang="ts">
	import { page } from '$app/state';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import PixelIcon from '$lib/components/PixelIcon.svelte';

	let { ref = $bindable(null), currentPage = $bindable(), ...restProps } = $props();

	$effect(() => {
		const flat = [home, ...groups.flatMap((group) => [group, ...group.items])];
		currentPage = flat.find((link) => link.url === page.url.pathname);
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
								class="flex aspect-square size-8 items-center justify-center bg-sidebar-primary text-sidebar-primary-foreground"
							>
								<PixelIcon name="bus" class="size-6" />
							</div>
							<div class="flex flex-col gap-1 leading-none">
								<span class="font-display text-xs uppercase">Stuff Directory</span>
								<span class="text-sm tracking-widest text-muted-foreground">v0.8-pixel</span>
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
				<Sidebar.MenuItem>
					<Sidebar.MenuButton isActive={page.url.pathname === home.url}>
						{#snippet child({ props })}
							<a href={home.url} {...props}>
								<PixelIcon name={home.icon} />
								<span>{home.title}</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
				{#each groups as group (group.title)}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton class="font-display text-xs uppercase">
							{#snippet child({ props })}
								<a href={group.url} {...props}>{group.title}</a>
							{/snippet}
						</Sidebar.MenuButton>
						<Sidebar.MenuSub>
							{#each group.items as item (item.url)}
								<Sidebar.MenuSubItem>
									<Sidebar.MenuSubButton isActive={item.url === page.url.pathname}>
										{#snippet child({ props })}
											<a href={item.url} {...props}>
												<PixelIcon name={item.icon} />
												<span>{item.title}</span>
											</a>
										{/snippet}
									</Sidebar.MenuSubButton>
								</Sidebar.MenuSubItem>
							{/each}
						</Sidebar.MenuSub>
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
							<div class="flex aspect-square size-8 items-center justify-center">
								<PixelIcon name="code" class="size-6" />
							</div>
							<span class="font-display text-xs uppercase">code</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
