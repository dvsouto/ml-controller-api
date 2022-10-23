const script = process.argv[2];

(async () => {
	const { default: scriptClass } = await import("./" + script + ".ts"); // Dynamic import
	const instance = new scriptClass(); // Instance class

	// Run script
	await instance.load();
	instance.run();
	instance.finalizated();
})();
