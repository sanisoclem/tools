<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import * as Item from '$lib/components/ui/item/index.js';
	import BadgeCheckIcon from '@lucide/svelte/icons/badge-check';
	import bs58check from 'bs58check';
	import bs58 from 'bs58';
	import { sha256 } from 'js-sha256';
	import { sha384, sha512 } from 'js-sha512';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { v4 as uuidv4, parse } from 'uuid';

	function hexToUint8Array(hexString: string) {
		// Ensure the hex string has an even length by padding with a leading zero if necessary
		if (hexString.length % 2 !== 0) {
			hexString = '0' + hexString;
		}

		const bytes = new Uint8Array(hexString.length / 2);
		for (let i = 0; i < hexString.length; i += 2) {
			bytes[i / 2] = parseInt(hexString.substr(i, 2), 16);
		}
		return bytes;
	}
	function getBytes(input: string, type: typeof inputType): Uint8Array {
		if (inputType === 'uuid') return parse(uuidv4());
		else if (inputType === 'sha256') return hexToUint8Array(sha256(input));
		else if (inputType === 'sha384') return hexToUint8Array(sha384(input));
		return hexToUint8Array(sha512(input));
	}

	const prefix = $props.id();
	let inputType = $state<'sha256' | 'sha384' | 'sha512' | 'uuid'>('sha256');
	let inputText = $state('12jH3nnhxhR3zPUcsKaWWZC9ZmZAnKm3GAnFD1xynGJE1d7RkJc');
	let bytes = $derived(getBytes(inputText, inputType));
	let encodedCheck = $derived(bs58check.encode(bytes));
	let encoded = $derived(bs58.encode(bytes));
</script>

<div class="flex max-w-lg flex-col gap-6 p-6">
	<p>Enter data to hash</p>
	<Textarea placeholder="Enter base58 text" class="min-w-sm" bind:value={inputText} rows={5} />
	<RadioGroup.Root bind:value={inputType}>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="uuid" id="{prefix}-uuid" />
			<Label for="{prefix}-uuid">UUID V4 (128-bit)</Label>
		</div>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="sha256" id="{prefix}-sha256" />
			<Label for="{prefix}-sha256">SHA 256</Label>
		</div>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="sha384" id="{prefix}-sha384" />
			<Label for="{prefix}-sha384">SHA 384</Label>
		</div>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="sha512" id="{prefix}-sha512" />
			<Label for="{prefix}-sha512">SHA 512</Label>
		</div>
	</RadioGroup.Root>

	<p>base58</p>
	<Textarea class="min-w-sm" value={encoded} rows={5} />

	<p>base58check</p>
	<Textarea class="min-w-sm" value={encodedCheck} rows={5} />
</div>
