<script lang="ts">
	import LauncherSection from '../launcher-section.svelte';
	import { tools } from '$lib/launcher';
</script>

<div class="p-6 md:p-10">
	<LauncherSection title="Tools" links={tools} />
</div>
