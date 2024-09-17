<script lang="ts">
	import { page } from '$app/stores';
	import * as Plot from '@observablehq/plot';

	let { data } = $props();

	let container: HTMLDivElement;

	$effect(() => {
		const chart = Plot.plot({
			width: container.clientWidth,
			marks: [
				Plot.barY(data.notas, {
					x: (d) => `${d.nome}::${d.id}`,
					y: 'notaFinal',
					fill: 'steelblue'
				})
			],
			x: {
				label: 'Alunos',
				tickFormat: (d) => d.split('::').shift(),
				tickRotate: -90
			},
			y: { label: 'Nota Final' },
			marginBottom: 120
		});

		container.replaceChildren(chart);
	});

	const materia = $derived(
		data.materias.find((d) => d.id.toString() === $page.url.searchParams.get('materia_id'))
	);

	const turma = $derived(
		data.turmas.find((d) => d.id.toString() === $page.url.searchParams.get('turma_id'))
	);
</script>

<div class="mt-4 mb-8 rounded-xl ring-1 ring-gray-200 bg-white p-6">
	<div>
		<h2 class="mb-1">Matérias</h2>
		<div class="flex gap-2">
			{#each data.materias as materia}
				<a
					href="/?turma_id={$page.url.searchParams.get('turma_id')}&materia_id={materia.id}"
					class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset
					{$page.url.searchParams.get('materia_id') === materia.id.toString()
						? 'bg-green-50 text-green-700 ring-green-600/20'
						: 'bg-gray-50 text-gray-600 ring-gray-500/10'}"
				>
					{materia.nome}
				</a>
			{/each}
		</div>
	</div>

	<div class="border-t mt-6 pt-4">
		<h2 class="mb-1">Turmas</h2>
		<div class="flex gap-2">
			{#each data.turmas as turma}
				<a
					href="/?turma_id={turma.id}&materia_id={$page.url.searchParams.get('materia_id')}"
					class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset
					{$page.url.searchParams.get('turma_id') === turma.id.toString()
						? 'bg-green-50 text-green-700 ring-green-600/20'
						: 'bg-gray-50 text-gray-600 ring-gray-500/10'}"
				>
					Turma {turma.nome}
				</a>
			{/each}
		</div>
	</div>
</div>

<div class="mt-4 mb-8 rounded-xl ring-1 ring-gray-200 bg-white p-6">
	<h2 class="text-xl font-bold tracking-tight text-gray-900 border-b mb-8 pb-4">
		Turma {turma?.nome} - {materia?.nome}
	</h2>

	<div bind:this={container} class="w-full"></div>
</div>
