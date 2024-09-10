import postgres from 'postgres';
const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;
const sql = postgres({
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT ?? ''),
    database: POSTGRES_DB,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});
export default sql;
