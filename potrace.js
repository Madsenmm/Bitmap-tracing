const os = require('os');
const Trace = require('./classes/tracer.js');

const outputPath = `${os.homedir()}\\Desktop\\Traced\\`;

// NPM script arguments
const input = process.env.npm_config_i;
const output = process.env.npm_config_o;

const Tracer = new Trace(input, output, {
	detailed: false,
	openBrowser: true,
	outputPath: outputPath,
	tracer: {
		turdsize: 4,
		threshold: 120,
		// background: '#141414',
		// color: '#f28900'
	}
})