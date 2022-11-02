import { Cli } from "./cli";
import { CSVController } from "@utils/CSVController";
class LoadProductsCsv extends Cli {
	declare csv: CSVController;
	
	constructor(){
		super();

		this.csv = new CSVController({ filename: "31_10_2022_produtos.csv"});
		this.setResultOutput(false);
	}

	public async run(){
		const data = await this.csv.read();

		return data;
	}
}

export default LoadProductsCsv;