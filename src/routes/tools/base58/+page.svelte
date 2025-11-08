<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import * as Item from '$lib/components/ui/item/index.js';
	import BadgeCheckIcon from '@lucide/svelte/icons/badge-check';
	import bs58check from 'bs58check';
	import bs58 from 'bs58';

	let bs58Text = $state('2DCrztKkiB8jtJBevZL2E1CGqnR7xqCnPpvh5b56fmNekQMx6c');

	let result = $derived(try_decode(bs58Text));
	let hexData = $derived(result?.data ? uint8ArrayToHexString(result.data) : '');
	let bits = $derived(result?.data ? result.data.length * 8 : 0);

	function try_decode(i: string) {
		if (i.length === 0) return null;
		try {
			const checkData = bs58check.decode(i);
			if (checkData) {
				return {
					isValid: true,
					hasCheck: true,
					data: checkData
				};
			}
		} catch {}
		try {
			const data = bs58.decode(i);
			if (data) {
				return {
					isValid: true,
					hasCheck: false,
					data
				};
			}
		} catch {}

		return {
			isValid: false
		};
	}
	function uint8ArrayToHexString(bytes: Uint8Array) {
		return Array.from(bytes, (byte) => {
			return byte.toString(16).padStart(2, '0');
		}).join('');
	}
</script>

<div class="flex max-w-lg flex-col gap-6 p-6">
	<p>Enter base58check/base58 encoded data:</p>
	<Textarea placeholder="Enter base58 text" class="min-w-sm" bind:value={bs58Text} rows={5} />

	<Item.Root
		variant="outline"
		size="sm"
		class={[{ 'text-green-500': result?.isValid, 'text-red-500': result?.isValid === false }]}
	>
		<Item.Media>
			<BadgeCheckIcon class="size-5" />
		</Item.Media>
		<Item.Content>
			<Item.Title>{result?.isValid ? 'valid' : 'invalid'} base58</Item.Title>
		</Item.Content>
	</Item.Root>

	<Item.Root
		variant="outline"
		size="sm"
		class={[{ 'text-green-500': result?.hasCheck, 'text-amber-500': result?.hasCheck === false }]}
	>
		<Item.Media>
			<BadgeCheckIcon class="size-5" />
		</Item.Media>
		<Item.Content>
			<Item.Title>{result?.hasCheck ? 'includes' : 'no'} checksum</Item.Title>
		</Item.Content>
	</Item.Root>
	<Item.Root variant="outline" size="sm">
		<Item.Media>
			<BadgeCheckIcon class="size-5" />
		</Item.Media>
		<Item.Content>
			<Item.Title>{bits} bits</Item.Title>
		</Item.Content>
	</Item.Root>

	<Textarea placeholder="hex representation" readonly class="min-w-sm" value={hexData} rows={5} />
</div>
