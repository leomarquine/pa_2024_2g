<script lang="ts">
	import * as Plot from '@observablehq/plot';

	let { data } = $props();

	function chart(node: HTMLDivElement, materia: (typeof data.materias)[number]) {
		const chart = Plot.plot({
			width: node.clientWidth,
			marks: [
				Plot.barY(materia.notas, {
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

		node.appendChild(chart);
	}
</script>

{#each data.materias as materia}
	<div class="mt-4 mb-16 rounded-3xl ring-1 ring-gray-200 bg-white p-10">
		<h2 class="text-2xl font-bold tracking-tight text-gray-900 border-b mb-8 pb-4">
			{materia.nome}
		</h2>
		<div use:chart={materia} class="w-full"></div>
	</div>
{/each}
