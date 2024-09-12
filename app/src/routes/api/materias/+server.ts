import sql from '$lib/server/database/connection';
import type { Materia } from '$lib/server/database/schema';
import { json } from '@sveltejs/kit';

export async function GET() {
	const data = await sql<Materia[]>`
        select * from materias
    `;

	return json(data);
}
