import { Command } from 'commander';
import sql from './connection.js';

export function register(program: Command) {
	program.command('migrate').description('Carrega a estrutura do banco de dados').action(main);
}

async function main() {
	await sql.file('./schema.sql');
	await sql.end();
}
