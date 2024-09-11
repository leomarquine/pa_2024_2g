import {
	POSTGRES_DB,
	POSTGRES_HOST,
	POSTGRES_PASSWORD,
	POSTGRES_PORT,
	POSTGRES_USER
} from '$env/static/private';
import postgres from 'postgres';

const sql = postgres({
	host: POSTGRES_HOST,
	port: parseInt(POSTGRES_PORT),
	database: POSTGRES_DB,
	username: POSTGRES_USER,
	password: POSTGRES_PASSWORD
});

export default sql;
