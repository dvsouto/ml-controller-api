module.exports = {
	presets: [
		[
			"@babel/preset-env",
			{
				targets: {
					node: "current"
				}
			}
		],
		"@babel/preset-typescript"
	],
	plugins: [
		["module-resolver", {
			alias: {
				"@controllers": "./src/controllers",
				"@entity": "./src/entity",
				"@midlewares": "./src/midlewares",
				"@models": "./src/models",
				"@utils": "./src/utils"
			}
		}],
    ["@babel/plugin-transform-arrow-functions", { "spec": true }]
	],
	ignore: [
		"**/*.spec.ts"
	],
  comments: false
};