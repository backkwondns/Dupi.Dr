const proxy = require('http-proxy-middleware');

module.exports = function(app) {
	app.use('/api',
		proxy({
			target: `http://XXX.XXX.XX.X:31000`,
			changeOrigin: true,
		})
	)
};
