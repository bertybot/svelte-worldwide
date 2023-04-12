<script lang="ts">
	import type { PageData } from './$types';
	import Projection from '$lib/Projection/Projection.svelte';
	import { feature } from 'topojson-client';
	import { onMount } from 'svelte';
	import svelteHack from '../images/svelte-hack.svg';
	import PropsTable from '../components/PropsTable.svx';
	import { geoContains, type GeoGeometryObjects, type ExtendedFeature } from 'd3-geo';

	export let data: PageData;
	export let width = 375;
	export let duration = 800;
	export let name = '';
	export let status = '';

	//style colors
	export let sphereStroke = '#cccccc';
	export let sphereFill = '#FFFFFF';
	export let landStroke: string | null = null;
	export let landFill = '#cccccc';
	export let selectedFill = '#FF0000';
	export let arcStroke = '#000000';
	export let arcStrokeWidth = 2;

	let countries: ExtendedFeature<GeoGeometryObjects | null>[] = [];
	function getLocation() {
		if (!navigator.geolocation) {
			return 'Geolocation is not supported by your browser use the dropdown to select a country!';
		} else {
			status = 'Locating...';
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { longitude, latitude } = position.coords;
					name = getCountryFromCoord(longitude, latitude);
					if (name) {
						status = `Hello ${name}!`;
					} else {
						status = 'Unable to retrieve your location use the dropdown to select a country!';
					}
				},
				() => {
					status = 'Unable to retrieve your location use the dropdown to select a country!';
				}
			);
		}
	}
	function getCountryFromCoord(long: number, lat: number) {
		for (const country of countries) {
			if (geoContains(country, [long, lat])) {
				return country.properties?.name;
			}
		}
		return '';
	}

	onMount(() => {
		//@ts-ignore the types package for this is wrong or something
		countries = feature(data.world, data.world.objects.countries).features;
		getLocation();
	});
</script>

<svelte:head>
	<title>Svelte-world</title>
	<meta name="description" content="Svelte Globe demo" />
</svelte:head>
<h1>Welcome to Svelte world!</h1>

<section>
	<Projection
		{width}
		{name}
		{duration}
		world={data.world}
		--svelte-world-sphere-stroke={sphereStroke}
		--svelte-world-sphere-fill={sphereFill}
		--svelte-world-land-stroke={landStroke}
		--svelte-world-land-fill={landFill}
		--svelte-world-selected-fill={selectedFill}
		--svelte-world-arc-stroke={arcStroke}
		--svelte-world-arc-stroke-width={arcStrokeWidth}
	/>
	<p aria-live="polite">{status}</p>
</section>
<form aria-label="Svelte world Props">
	<label>
		Choose a country
		<select bind:value={name} on:change={() => (status = name)}>
			<option value="" selected disabled>Select a country</option>
			{#each countries as country}
				{@const countryName = country.properties?.name}
				<option value={countryName}>{countryName}</option>
			{/each}
		</select>
	</label>
</form>
<PropsTable
	bind:width
	bind:duration
	{name}
	bind:sphereFill
	bind:sphereStroke
	bind:landFill
	bind:landStroke
	bind:selectedFill
	bind:arcStroke
	bind:arcStrokeWidth
/>
<section>
	<p>A fully reactive globe component written with Svelte + D3!</p>
	<p>
		Written for <a href="https://hack.sveltesociety.dev/"> Svelte Hack 2023 </a>
		<img src={svelteHack} alt="Svelte Hack" />
	</p>
</section>

<style>
	h1,
	p {
		color: white;
	}
	section {
		display: grid;
		justify-items: center;
		justify-content: center;
		align-items: center;
		text-align: center;
		font-size: 1.7rem;
	}
	form {
		display: grid;
		justify-items: center;
		grid-template-columns: 1fr;
	}
	label {
		display: flex;
		width: 375px;
		gap: 0.3rem;
		margin: 0.5rem;
		flex-direction: column;
		color: white;
	}

	select {
		padding: 0.5rem;
	}
</style>
