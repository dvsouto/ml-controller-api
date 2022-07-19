import { AppDataSource } from "../src/data-source";

console.log("Running migrations...");


export default ( async () => {
	await AppDataSource.initialize();
	await AppDataSource.runMigrations();

	console.log("OK!");
})();