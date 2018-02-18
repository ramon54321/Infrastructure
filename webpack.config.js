module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "./lib/bundle.js"
  },
  module: {
		loaders: [
			{
				test: /\.js/,
				include: /src/,
				loader: "babel-loader"
			}
		]
	}
}
