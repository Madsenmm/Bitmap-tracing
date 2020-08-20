const potrace = require('potrace');
const fs = require('fs');
const chalk = require('chalk');
const open = require('open');
const moment = require('moment');
const deepmerge = require('deepmerge');


/**
 * Tracer class
 */

class Trace {

	/**
	 * Constructor
	 * @param input 	Input filepath
	 * @param output 	Output filename
	 * @param options 	Optinal settings for tracer
	 */

	constructor( input, output, options ) {
		this.input = input;
		this.output = output;

		this.defaults = {
			detailed: false,
			openBrowser: false,
			outputPath: `${process.cwd()}/traced/`,
			dateFormat: moment().format('DDMMYYYY-hhmmss'),
			tracer: {
				threshold: 150,
				optTolerance: 0.7,
				steps: 4
			}
		}

		this.settings = deepmerge(this.defaults, options);

		this.messages = {
			'MISSING_ARGUMENTS': chalk.red(`No input or output specified add ${chalk.bold('-i=INPUT_PATH -o=OUTPUT_FILE_NAME')}`),
			'FILE_MISSING': chalk.bold.magenta(`File ${chalk.bold(this.input)} doesn\'t exist`),
			'FILE_EXISTS': chalk.grey(`File already exists, adding Date ${chalk.bold(`"${this.settings.dateFormat}"`)} to filename`),
			'CREATING_FILE': chalk.magenta(`Creating file ${chalk.bold(`${this.output}.svg`)}`),
			'SUCCESS': chalk.green.bold(`Finished tracing image:`),
			'OPEN_BROWSER': chalk.blue.bold('Opening in browser!')
		}

		// Initialise tracing
		this.init();
	}



	/**
	 * Initialize tracer
	 */

	init() {

		if ( !this.input || !this.output ) {
			console.log(this.messages.MISSING_ARGUMENTS);
			return;
		}

		// Begin tracing
		this.begin();
	}



	/**
	 * Begin tracing
	 */

	begin() {

		// Create folder if it doesn't exist
		if ( !fs.existsSync(this.settings.outputPath) ) {
			fs.mkdirSync(this.settings.outputPath);
		}

		// Check if input file exists
		if ( fs.existsSync(this.input) ) {
			this.trace();
		} else {
			console.log(this.messages.FILE_MISSING)
		}
	}



	/**
	 * Handle tracing
	 */

	trace() {
		const self = this;
		const type = this.settings.detailed ? 'posterize' : 'trace';

		potrace[type](this.input, this.settings.tracer, function(err, svg) {
			self.tracerResult(err, svg);
		})
	}



	/**
	 * Handle trace results
	 * @param err	Errors
	 * @param svg	Traced SVG
	 */

	tracerResult(err, svg) {
		if (err) throw err;

		const filePostfix = this.outputFileExists() ? `-${this.settings.dateFormat}` : '';
		const filePath = `${this.settings.outputPath}${this.output}${filePostfix}.svg`;
		const fileName = `${this.output}${filePostfix}.svg`;

		fs.writeFileSync(filePath, svg);

		console.log(this.messages.SUCCESS, chalk.bold(fileName));

		if ( this.settings.openBrowser ) {
			this.openBrowser(filePath)
		}
	}


	/**
	 * Open browser when finished tracing
	 * @param filePath 		Filepath for traced file
	 */

	openBrowser( filePath ) {
		console.log(this.messages.OPEN_BROWSER)

		setTimeout(function() { 
			open(filePath);
		}, 2000);
	}



	/**
	 * Validate if output file already exists
	 */

	outputFileExists() {
		const outputPath = `${this.settings.outputPath}${this.output}.svg`;
		const fileExists = fs.existsSync(outputPath);

		if ( fileExists ) {
			console.log(this.messages.FILE_EXISTS);
		} else {
			console.log(this.messages.CREATING_FILE);
		}

		return fileExists;
	}

}


module.exports = Trace;