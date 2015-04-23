var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
	constructor: function() {
		// Calling the super constructor is important so our generator is correctly set up
		generators.Base.apply(this, arguments);

		this.program = require('../../package.json');

		this.option('smacss', {
			desc: 'Use SMACSS',
			type: Boolean,
			defaults: false
		});
		this.smacss = this.options.smacss;
	},

	ui: function() {
		var prompts = [{
			type: "list",
			name: "approach",
			message: "Do you want scaffolding to include SMACSS approach ? (Default: Yes)",
			choices: [
				"Skip this question. Keep the default.",
				"No"
			],
			filter: function(val) {
				if (val.toLowerCase().indexOf("skip") > -1) {
					return true;
				}
				return false;
			}
		}, {
			type: "list",
			name: "preprocessor",
			message: "Do you want scaffolding to include CSS preprocessor ? (Default: CSS)",
			choices: [
				"LESS - Configures LESS.",
				"Skip this question. Keep the default."
			],
			filter: function(val) {
				var val = val.toLowerCase();
				if (val.indexOf("less") > -1) {
					return 'less';
				} else {
					return false;
				}
			}
		}];

		this.prompt(prompts, function(answers) {
			console.log(answers);
		}.bind(this));
	},

	app: function() {
		this.mkdir('config');
		this.mkdir('config/build');
		this.mkdir('config/lints');
		this.mkdir('src');
		this.mkdir('src/apps');
		this.mkdir('src/assets');
		this.mkdir('src/stylesheets');
		this.mkdir('src/systems');
		this.mkdir('src/templates');
		this.mkdir('tests');
	}
});