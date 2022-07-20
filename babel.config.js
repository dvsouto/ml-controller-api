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
    ["@babel/plugin-transform-arrow-functions", { "spec": true }]
	],
	ignore: [
		"**/*.spec.ts"
	],
  comments: false
};