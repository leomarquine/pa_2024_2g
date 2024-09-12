import sql from '$lib/server/database/connection';
import type { Turma } from '$lib/server/database/schema';
import { json } from '@sveltejs/kit';

export async function GET() {
	const data = await sql<Turma[]>`
        select * from turmas
    `;

	return json(data);
}
