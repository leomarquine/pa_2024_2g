import sql, { type QueryFragment } from './connection';

export function concat(
	segments: QueryFragment[],
	separator: QueryFragment = sql` `
): QueryFragment {
	return segments.reduce((a, b) => sql`${a}${separator}${b}`);
}

export function when(condition: boolean, ...values: QueryFragment[]): QueryFragment {
	return condition ? concat(values, sql` `) : sql``;
}

export function where(fragments: QueryFragment[], separator: QueryFragment = sql` and `) {
	if (fragments.length === 0) {
		return sql``;
	}

	return sql`where ${concat(fragments, separator)}`;
}
