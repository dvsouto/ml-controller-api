import { dirname, resolve } from "path";
import { parse, Parser } from "csv-parse";
import * as fs from "fs";

import { isFloat } from "@utils/numbers";
import { parseBrand, parseProduct, parseSettings } from "@utils/strings";

type CSVOptions = {
	delimiterField: string
	delimiterText: string
	ignoreTitle: boolean
};

type CSVControllerConstructor = {
	path?: string
	absolutePath?: boolean
	filename?: string
	options?: CSVOptions
}
class CSVController {
	declare private path: string;
	declare private absolutePath: boolean;
	declare private filename: string;
	declare private options: CSVOptions;
	declare private csvParser: Parser;

	declare private records: Array<object>;
  
	constructor({ path, absolutePath, filename, options}: CSVControllerConstructor = { path: null, absolutePath: false, filename: null, options: null }){
		this.setPath(path, absolutePath);
		this.setFilename(filename);
		this.setOptions(options);
	}

	public setPath(path: string | null, absolutePath: boolean | null = false ): void{
		if (! path) {
			path = resolve(dirname(require.main.filename) + "/../../tmp");
		} else {
			if (! absolutePath) {
				if (path[0] == "/") {
					path = path.substring(1);
				}

				path = resolve(dirname(require.main.filename) + "/../../" + path);
			} else {
				if (path[0] != "/") {
					path = "/" + path;
				}
			}
		}

		if (absolutePath === null) {
			absolutePath = false;
		}

		if (path.substring(path.length-1) != "/") {
			path += "/";
		}

		this.path = path;
		this.absolutePath = absolutePath;
		this.records = [];
	}

	public setFilename(filename: string | null): void{
		if (! filename) {
			filename = "temp.csv";
		}

		if (filename.substring(filename.length-4).toLowerCase() !== ".csv") {
			filename += ".csv";
		}

		this.filename = filename;
	}

	public setOptions(options: CSVOptions | null): void{
		if (! options) {
			options = {} as CSVOptions;
		}

		if (! options.delimiterField) {
			options.delimiterField = ",";
		}

		if (! options.delimiterText) {
			// eslint-disable-next-line quotes
			options.delimiterText = '"';
		}

		this.options = options;
	}

	public getPath(): string{
		return this.path;
	}

	public getFilename(): string{
		return this.filename;
	}

	public getOptions(): CSVOptions{
		return this.options;
	}

	private getFullPath(): string{
		return this.path + this.filename;
	}

	private createParser(): Parser{
		const _parser = parse({
			delimiter: this.getOptions().delimiterField,
			quote: this.getOptions().delimiterText,
			columns: ["cod", "embalagem", "nome", "preco"]
		});

		return _parser;
	}

	private readFileContent(): string{
		return fs.readFileSync(this.getFullPath(), {
			encoding: "utf-8"
		});
	}

	private readFileAndParse(parser: Parser){
		const fileContent = this.readFileContent();
		const fileContentArr = fileContent.split("\n");

		fileContentArr.forEach(line => {
			line = line.trim();

			if (line) {
				parser.write(line + "\n");
			}
		});

		parser.end();
	}

	private onCsvReadLine(record: object){
		record = this.parseData(record);

		console.log("Record", record);

		this.records.push(record);
	}

	private parseData(data: object): object{
		Object.keys(data).forEach(key => {
			let columnData = data[key].trim();
			const intColumnData = parseInt(columnData);
			const floatColumnData = parseFloat(columnData.toString().replace(/[,]/g, "."));

			if (Number.isInteger(intColumnData)){
				columnData = parseInt(columnData);
			}

			if (isFloat(floatColumnData)) {
				columnData = floatColumnData;
			}

			if (typeof columnData === "string" && key == "nome") {
				data["nome_parseado"] = parseProduct(columnData);
				data["marca"] = parseBrand(data["nome_parseado"]);
				data["settings"] = parseSettings(data["nome_parseado"]);
			}

			data[key] = columnData;
		});

		return data;
	}

	private onCsvParseError(err: Error){
		console.error("Parse error:", err.message);
	}

	private onCsvReadEnd(){
		console.log("End CSV Reader!");

		this.csvParser.destroy();
	}

	public async read(): Promise<Array<object>>{
		this.csvParser = this.createParser();

		return new Promise((resolve, reject) => {
			console.log("Start CSV Reader...");

			this.csvParser.on("readable", () => {
				let record = null;
				while((record = this.csvParser.read()) !== null) {
					this.onCsvReadLine(record);
				}
			});

			this.csvParser.on("error", (err) => {
				this.onCsvParseError(err);

				reject(err);
			});

			this.csvParser.on("end", () => {
				this.onCsvReadEnd();

				resolve(this.records);
			});

			this.readFileAndParse(this.csvParser);
		});
	}
}

export {
	CSVController
};