const Dotenv = require('dotenv-webpack');

module.exports = {
	env: {
		MOVIE_API_KEY: process.env.MOVIE_API_KEY,
	},

	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		config.module.rules.push({
			test: /\.(png|jpe?g|gif)$/i,
			use: [
				{
					loader: 'file-loader',
				},
			],
		});
		config.plugins.push(new Dotenv({ silent: true }));
		return config;
	},
};
