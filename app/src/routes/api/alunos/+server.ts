import sql, { type QueryFragment } from '$lib/server/database/connection';
import { where } from '$lib/server/database/helpers';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const fragments: QueryFragment[] = [];
	const sexo = url.searchParams.get('sexo')?.toUpperCase();

	if (sexo) {
		fragments.push(sql`sexo = ${sexo}`);
	}

	const alunos = await sql`
		select * from alunos ${where(fragments)}
	`;

	return json(alunos);
}
