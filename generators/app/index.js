var generators = require('yeoman-generator');

/*
	Either type of generator can be extended to create an app generator or a subcommand generator. 
	Base is extended, most often, for an app generator and NamedBase for a subcommand generator
	where a filename is required.
*/

// module.exports = generators.Base.extend();
// module.exports = generators.NamedBase.extend();

module.exports = generators.Base.extend({
	// The name `constructor` is important here
	constructor: function() {
		// Calling the super constructor is important so our generator is correctly set up
		generators.Base.apply(this, arguments);

		// Next, add your custom code
		this.option('coffee'); // This method adds support for a `--coffee` flag
	},

	method1: function() {
		console.log('method 1 just ran');
	},
	
	method2: function() {
		console.log('method 2 just ran');
	}
});