import { Command } from 'commander';
import sql from './database/connection.js';
import Excel from 'exceljs';

export function register(program: Command) {
	program.command('etl').description('Trata e carrega os dados no banco').action(main);
}

async function main() {
	const workbook = new Excel.Workbook();

	await workbook.xlsx.readFile('./Dados_Turmas_9Ano.xlsx');

	const tab = workbook.getWorksheet(1);

	if (tab === undefined) {
		console.error('Falha ao ler arquivo');
		process.exit();
	}

	const selecionaTurma = await carregaTurmas(tab);
	const selecionaMateria = await carregaMaterias();
	const selecionaEtapa = await carregaEtapas();

	for (let index = 2; index <= tab.rowCount; index++) {
		const row = tab.getRow(index);

		const aluno = {
			nome: row.getCell(2).text,
			sexo: row.getCell(3).text
		};

		const [{ id }] = await sql`
			insert into alunos ${sql(aluno)} returning id
		`;

		const familia = {
			aluno_id: id,
			nome_pai: row.getCell(14).text,
			ocupacao_pai: row.getCell(15).text,
			salario_pai: row.getCell(16).text,
			nome_mae: row.getCell(17).text,
			ocupacao_mae: row.getCell(18).text,
			salario_mae: row.getCell(19).text,
			pessoas_na_casa: row.getCell(20).text
		};

		await sql`
			insert into aluno_familia ${sql(familia)}
		`;

		const turma = {
			aluno_id: id,
			turma_id: selecionaTurma(row.getCell(1).text),
			frequencia: row.getCell(13).text,
			renovou_matricula: row.getCell(21).text
		};

		await sql`
			insert into aluno_turma ${sql(turma)}
		`;

		// prettier-ignore
		const colunas = {
			'Português': 4,
			'Matemática': 5,
			'Ciências': 6,
			'História': 7,
			'Geografia': 8,
			'Inglês': 9,
			'Espanhol': 10,
			'Educação Física': 11,
			'Informática': 12
		};

		for (const [materia, coluna] of Object.entries(colunas)) {
			const etapas = JSON.parse(
				row.getCell(coluna).text.replace(/'/g, '"').replace(/None/g, 'null')
			) as { [key: string]: number | null };

			for (const [etapa, nota] of Object.entries(etapas)) {
				const data = {
					aluno_id: id,
					materia_id: selecionaMateria(materia),
					turma_id: selecionaTurma(row.getCell(1).text),
					etapa_id: selecionaEtapa(etapa),
					nota
				};

				await sql`
					insert into notas ${sql(data)}
				`;
			}
		}
	}

	await sql.end();
}

async function carregaTurmas(tab: Excel.Worksheet) {
	const nomes = new Set<string>();

	tab.eachRow((row, index) => {
		if (index === 1) {
			return;
		}

		nomes.add(row.getCell(1).text);
	});

	const turmas: { [key: string]: number } = {};

	for (const nome of nomes) {
		const [{ id }] = await sql`
			insert into turmas (nome, serie, ano_letivo) values (${nome}, '9º ano', '2023') returning id;
		`;

		turmas[nome] = id;
	}

	return (nome: string) => turmas[nome];
}

async function carregaMaterias() {
	// prettier-ignore
	const materias: { [key: string]: number } = {
		'Português': 0,
		'Matemática': 0,
		'Ciências': 0,
		'História': 0,
		'Geografia': 0,
		'Inglês': 0,
		'Espanhol': 0,
		'Educação Física': 0,
		'Informática': 0
	};

	for (const nome of Object.keys(materias)) {
		const [{ id }] = await sql`
			insert into materias (nome) values (${nome}) returning id;
		`;

		materias[nome] = id;
	}

	return (nome: string) => materias[nome];
}

async function carregaEtapas() {
	const etapas: { [key: string]: number } = {
		'1ª Etapa': 0,
		'2ª Etapa': 0,
		'3ª Etapa': 0,
		'Recuperação 1ª': 0,
		'Recuperação 2ª': 0,
		'Recuperação 3ª': 0,
		'Recuperação Final': 0
	};

	for (const nome of Object.keys(etapas)) {
		const [{ id }] = await sql`
			insert into etapas (nome) values (${nome}) returning id;
		`;

		etapas[nome] = id;
	}

	return (nome: string) => etapas[nome];
}

function parseNotas(value: string) {}
