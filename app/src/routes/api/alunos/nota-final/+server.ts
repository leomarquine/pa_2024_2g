import sql from '$lib/server/database/connection';
import type { Aluno } from '$lib/server/database/schema';
import { json } from '@sveltejs/kit';

type Row = Aluno & {
	notas: {
		etapa: string;
		nota: number | null;
	}[];
};

export async function GET({ url }) {
	const materia_id = url.searchParams.get('materia_id') ?? '1';

	const notas = await sql<Row[]>`
		select
			alunos.*,
			(
				select json_agg(json_build_object('etapa', etapas.nome, 'nota', notas.nota))
				from notas
				inner join etapas on etapas.id = notas.etapa_id
				where notas.aluno_id = alunos.id and notas.materia_id = ${materia_id}

			) as notas
		from alunos
	`;

	const result = notas.map((d) => {
		return {
			id: d.id,
			nome: d.nome,
			sexo: d.sexo,
			notaFinal: calculaNotaFinal(d.notas)
		};
	});

	return json(result);
}

function calculaNotaFinal(data: Row['notas']) {
	const notas = [
		max(data, '1ª Etapa', 'Recuperação 1ª'),
		max(data, '2ª Etapa', 'Recuperação 2ª'),
		max(data, '3ª Etapa', 'Recuperação 3ª')
	];

	const min = Math.min(...notas);
	const index = notas.indexOf(min);

	const recuperacaoFinal = data.find((d) => d.etapa === 'Recuperação Final')?.nota ?? 0;

	if (index >= 0 && recuperacaoFinal > min) {
		notas[index] = recuperacaoFinal;
	}

	return notas.reduce((acc, value) => acc + value, 0);
}

function max(data: Row['notas'], a: string, b: string) {
	const n1 = data.find((d) => d.etapa === a)?.nota ?? 0;
	const n2 = data.find((d) => d.etapa === a)?.nota ?? 0;

	return Math.max(n1, n2);
}
