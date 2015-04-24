'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
	constructor: function() {
		// Calling the super constructor is important so our generator is correctly set up
		generators.Base.apply(this, arguments);

		this.program = require('../../package.json');

		this.option('appPath', {
			desc: 'Name of application directory',
			type: 'String',
			defaults: 'myapp',
			optional: true
		});
		this.appPath = this.options.appPath;

		// this.option('smacss', {
		// 	desc: 'Use SMACSS',
		// 	type: Boolean,
		// 	defaults: false
		// });
		// this.smacss = this.options.smacss;

		// this.option('pre', {
		// 	desc: 'Use Preprocessor',
		// 	type: String,
		// 	defaults: 'css'
		// });
		// this.pre = this.options.pre;
	},

	// ui: function() {
	// 	var prompts = [{
	// 		type: "list",
	// 		name: "preprocessor",
	// 		message: "Do you want scaffolding to include CSS preprocessor ? (Default: CSS)",
	// 		choices: [
	// 			"LESS - Configures LESS.",
	// 			"SASS - Configures SASS.",
	// 			"Stylus - Configures Stylus.",
	// 			"Skip this question. Keep the default."
	// 		],
	// 		filter: function(val) {
	// 			var val = val.toLowerCase();
	// 			if (val.indexOf("less") > -1) {
	// 				return 'less';
	// 			} else if (val.indexOf("sass") > -1) {
	// 				return 'sass';
	// 			} else if (val.indexOf("stylus") > -1) {
	// 				return 'stylus';
	// 			} else {
	// 				return false;
	// 			}
	// 		}
	// 	}];

	// 	this.prompt(prompts, function(answers) {
	// 		this.log(answers);
	// 	}.bind(this));
	// },

	app: function() {
		this.fs.copyTpl(
			this.templatePath('_readme.md'),
			this.destinationPath(this.appPath + '/README.md'), {
				projectName: this.appPath
			}
		);

		this.fs.copyTpl(
			this.templatePath('_editorconfig'),
			this.destinationPath(this.appPath + '/.editorconfig')
		);

		this.fs.copyTpl(
			this.templatePath('_package.json'),
			this.destinationPath(this.appPath + '/package.json'), {
				projectName: this.appPath
			}
		);

		this.fs.copyTpl(
			this.templatePath('_travis.yml'),
			this.destinationPath(this.appPath + '/.travis.yml')
		);

		this.fs.copyTpl(
			this.templatePath('_server.js'),
			this.destinationPath(this.appPath + '/server.js')
		);

		// this.fs.copyTpl(
		// 	this.templatePath('_Gruntfile.js'),
		// 	this.destinationPath(this.appPath + '/Gruntfile.js')
		// );

		this.directory('/config', this.appPath + '/config');
		this.directory('/src', this.appPath + '/src');
		this.directory('/tests', this.appPath + '/tests');
	},

	// writing: function() {
	// 	this.fs.copyTpl(
	// 		this.templatePath('index.html'),
	// 		this.destinationPath('src/index.html'), {
	// 			title: 'Templating with Yeoman'
	// 		}
	// 	);
	// },

	// install: function() {
	// 	this.on('end', function() {
	// 		this.log("Installation completed!");
	// 	});
	// }
});