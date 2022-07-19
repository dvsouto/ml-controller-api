import { AppDataSource } from "../src/data-source";

console.log("Undo last migrations...");


export default ( async () => {
	await AppDataSource.initialize();
	await AppDataSource.undoLastMigration();

	console.log("OK!");
})();