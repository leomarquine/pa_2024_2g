import type { Aluno, Materia, Turma } from '$lib/server/database/schema';
import { redirect } from '@sveltejs/kit';

export async function load({ fetch, url }) {
	const materia_id = url.searchParams.get('materia_id');
	const turma_id = url.searchParams.get('turma_id');

	if (!materia_id || !turma_id) {
		redirect(303, `/?turma_id=${turma_id ?? 1}&materia_id=${materia_id ?? 1}`);
	}

	const materias = (await fetch('/api/materias').then((response) => response.json())) as Materia[];
	const turmas = (await fetch('/api/turmas').then((response) => response.json())) as Turma[];

	const notas = (await fetch(
		`/api/alunos/nota-final?turma_id=${turma_id}&materia_id=${materia_id}`
	).then((response) => response.json())) as (Aluno & { notaFinal: number })[];

	return {
		materias,
		turmas,
		notas
	};
}
