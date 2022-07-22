import { CliDataSource } from "../src/data-source";

console.log("Undo last migrations...");

export default ( async () => {
	await CliDataSource.initialize();
	await CliDataSource.undoLastMigration();

	console.log("OK!");
})();