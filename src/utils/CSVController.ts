class CSVController {
	declare private path;
	declare private filename;
  
	constructor(path = null, filename = null){
		if (! path) {
			path = __dirname;
		}

		if (! filename) {
			filename = "temp.zip";
		}

		this.setPath(path);
		this.setFilename(filename);
	}

	public setPath(path): void{
		this.path = path;
	}

	public setFilename(filename): void{
		this.filename = filename;
	}

	public read(): Array<object>{
		return [];
	}
}

export {
	CSVController
};