export type Aluno = {
	id: number;
	nome: string;
	sexo: 'M' | 'F';
};

export type Familia = {
	aluno_id: number;
	nome_pai: string;
	ocupacao_pai: string;
	salario_pai: number;
	nome_mae: string;
	ocupacao_mae: string;
	salario_mae: number;
	pessoas_na_casa: number;
};

export type Materia = {
	id: number;
	nome: string;
};

export type turmas = {
	id: number;
	nome: string;
	serie: string;
	ano_letivo: number;
};

export type AlunoTurma = {
	aluno_id: number;
	turma_id: number;
	frequencia: number;
	renovou_matricula: boolean;
};

export type Etapa = {
	id: number;
	nome: string;
};

export type notas = {
	id: number;
	aluno_id: number;
	materia_id: number;
	turma_id: number;
	etapa_id: number;
	nota: number;
};
