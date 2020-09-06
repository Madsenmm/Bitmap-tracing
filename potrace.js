const os = require('os');
const swapColors = require('./utils/object.js');
const Trace = require('./classes/tracer.js');

const outputPath = `${os.homedir()}\\Desktop\\Traced\\`;

// NPM script arguments
const input = process.env.npm_config_i;
const output = process.env.npm_config_o;

const threshold = parseInt(process.env.npm_config_thres || 160);
const invert = process.env.npm_config_invert;

let colors = {};

// colors = {
// 	background: '#000000',
// 	color: '#eeb023'
// }

if ( invert ) {
	colors = swapColors(colors);
}

const tracerSettings = {
	turdsize: 2,
	threshold: threshold,
	optTolerance: 0.2,
	// blackOnWhite: true
	// optCurve: true,
	// alphaMax: 1
}

const Tracer = new Trace(input, output, {
	detailed: false,
	openBrowser: true,
	outputPath: outputPath,
	tracer: {...tracerSettings, ...colors},
})