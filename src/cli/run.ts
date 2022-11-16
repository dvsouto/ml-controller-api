const script = process.argv[2];
// eslint-disable-next-line @typescript-eslint/no-empty-function
const AsyncFunction = (async () => {}).constructor;

(async () => {
	const { default: scriptClass } = await import("./" + script + ".ts"); // Dynamic import
	const instance = new scriptClass(process.argv); // Instance class

	// Run script
	await instance.load();

	let result = false;

	// Check if is async and run the script
	if (instance.run instanceof AsyncFunction) {
		result = await instance.run();
	} else {
		result = instance.run();
	}

	instance.finalizated(result);
})();
