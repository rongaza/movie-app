module.exports = {
	env: {
		movieAPIKey: 'a41a2ea2b89a629ae5e3e8ff465e72bc',
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
		return config;
	},
};

