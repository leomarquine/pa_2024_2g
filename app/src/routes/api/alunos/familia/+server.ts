import sql from '$lib/server/database/connection';
import type { Aluno, Familia } from '$lib/server/database/schema';
import { json } from '@sveltejs/kit';

type Row = Aluno & {
	familia: Familia;
};

export async function GET() {
	const data = await sql<Row[]>`
		select
			alunos.*,
            row_to_json(familia.*) as familia
		from alunos
        inner join aluno_familia as familia on familia.aluno_id = alunos.id
	`;

	return json(data);
}
