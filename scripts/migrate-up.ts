import { CliDataSource } from "../src/data-source";

console.log("Running migrations...");

export default ( async () => {
	await CliDataSource().initialize();
	await CliDataSource().runMigrations();

	console.log("OK!");
})();