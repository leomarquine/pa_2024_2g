import { Command } from 'commander';
import dotenv from 'dotenv';
dotenv.config();
const commands = ['./database/migrate.js'];
const program = new Command();
program.configureHelp({
    sortSubcommands: true
});
for (const command of commands) {
    const { register } = await import(command);
    register(program);
}
program.parse(process.argv);
