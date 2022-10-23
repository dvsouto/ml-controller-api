enum ECompressType {
  ZIP = "ZIP",
  RAR = "RAR",
  TAR_GZ = "TAR_GZ",
  UNKNOWN = "UNKNOWN"
}

class Zipper {
	declare private path;
	declare private filename;
	declare private compressType;
  
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

	private loadCompressType(){
		const extension = this.filename.substr(this.filename.indexOf(".", 1), this.filename.length);
		let compressType = ECompressType.UNKNOWN;

		switch(extension){
		case "ZIP":
			compressType = ECompressType.ZIP;
			break;
		case "RAR":
			compressType = ECompressType.RAR;
			break;
		case "TARGZ":
			compressType = ECompressType.TAR_GZ;
			break;
		}

		this.compressType = compressType;
	}

	public setPath(path): void{
		this.path = path;

		this.loadCompressType();
	}

	public setFilename(filename): void{
		this.filename = filename;

		this.loadCompressType();
	}

	public getFullPath(): string{
		return this.path + this.filename;
	}

	public unzip(): boolean{
		return true;
	}

	public zip(compressType: ECompressType): boolean{
		switch(compressType){
		default:
		case ECompressType.UNKNOWN:
			return false;
		}

		return false;
	}
}

export {
	Zipper,

	ECompressType
};