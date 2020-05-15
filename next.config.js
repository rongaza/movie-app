const Dotenv = require('dotenv-webpack');

module.exports = {
	env: {
<<<<<<< HEAD
		MOVIE_API_KEY: process.env.MOVIE_API_KEY,
=======
		movieAPIKey: '',
>>>>>>> d149cb1da49f6a9af4f784744b81716e8d17c7f8
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
