import type { Aluno, Materia } from '$lib/server/database/schema';

export async function load({ fetch }) {
	const items = (await fetch('/api/materias').then((response) => response.json())) as Materia[];

	const notas = await Promise.all(
		items.map((d) =>
			fetch(`/api/alunos/nota-final?materia_id=${d.id}`).then((response) => response.json())
		) as Promise<(Aluno & { notaFinal: number })[]>[]
	);

	const materias = items.map((d, index) => ({
		...d,
		notas: notas[index]
	}));

	return {
		materias
	};
}
