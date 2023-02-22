module.exports = {
	presets: [
		[
			"@babel/env",
			{
				targets: {
					node: "current"
				}
			}
		],
		[
			"@babel/typescript",
			{
				allowDeclareFields: true,
				onlyRemoveTypeImports: true,
				optimizeConstEnums: true
			}
		]
	],
	plugins: [
		["module-resolver", {
			alias: {
				"@src": "./src",
				"@controllers": "./src/controllers",
				"@entity": "./src/entity",
				"@middlewares": "./src/middlewares",
				"@migrations": "./src/migrations",
				"@models": "./src/models",
				"@providers": "./src/providers",
				"@routes": "./src/routes",
				"@services": "./src/services",
				"@utils": "./src/utils"
			}
		}],
    [
			"@babel/transform-arrow-functions", { 
				"spec": true 
			}
		],
		[
			"@babel/proposal-decorators", {
				"version": "2023-01"
			}
		],
		[
			"transform-class-properties", { 
				"spec": true 
			}
		],
		"@babel/proposal-object-rest-spread"
	],
	ignore: [
		"**/*.spec.ts"
	],
  comments: false
};