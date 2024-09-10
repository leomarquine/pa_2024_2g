DROP TABLE IF EXISTS notas;
DROP TABLE IF EXISTS etapas;
DROP TABLE IF EXISTS aluno_turma;
DROP TABLE IF EXISTS turmas;
DROP TABLE IF EXISTS materias;
DROP TABLE IF EXISTS aluno_familia;
DROP TABLE IF EXISTS alunos;

CREATE TABLE alunos (
	id SERIAL PRIMARY KEY,
	nome TEXT NOT NULL,
	sexo CHAR(1) CHECK (sexo IN ('M', 'F'))
);

CREATE TABLE aluno_familia (
	aluno_id INT PRIMARY KEY REFERENCES alunos(id) ON DELETE CASCADE,
	nome_pai TEXT,
	ocupacao_pai TEXT,
	salario_pai DECIMAL(10, 2),
	nome_mae TEXT,
	ocupacao_mae TEXT,
	salario_mae DECIMAL(10, 2),
	pessoas_na_casa INT
);

CREATE TABLE materias (
	id SERIAL PRIMARY KEY,
	nome TEXT NOT NULL
);

CREATE TABLE turmas (
	id SERIAL PRIMARY KEY,
	nome TEXT NOT NULL,
	serie TEXT,
	ano_letivo INT
);

CREATE TABLE aluno_turma (
	aluno_id INT REFERENCES alunos(id) ON DELETE CASCADE,
	turma_id INT REFERENCES turmas(id) ON DELETE CASCADE,
	frequencia DECIMAL(5, 2),
	renovou_matricula BOOLEAN,
	PRIMARY KEY (aluno_id, turma_id)
);

CREATE TABLE etapas (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL
);

CREATE TABLE notas (
	id SERIAL PRIMARY KEY,
	aluno_id INT REFERENCES alunos(id) ON DELETE CASCADE,
	materia_id INT REFERENCES materias(id) ON DELETE CASCADE,
	turma_id INT REFERENCES turmas(id) ON DELETE CASCADE,
	etapa_id INT REFERENCES etapas(id) ON DELETE CASCADE,
	nota DECIMAL(5, 2)
);
