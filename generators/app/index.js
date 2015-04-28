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
	},

	_copyTemplates: function(tPath, dPath, valSetter) {
		this.fs.copyTpl(
			this.templatePath(tPath),
			this.destinationPath(this.appPath + dPath), (valSetter) ? valSetter : {}
		);
	},

	app: function() {
		this._copyTemplates('_readme.md', '/README.md', {
			projectName: this.appPath
		});
		this._copyTemplates('_editorconfig', '/.editorconfig');
		this._copyTemplates('_bowerrc.js', '/.bowerrc.js');
		this._copyTemplates('_package.json', '/package.json', {
			projectName: this.appPath
		});
		this._copyTemplates('_travis.yml', '/.travis.yml');
		this._copyTemplates('_server.js', '/server.js');

		this._copyTemplates('config/lints/_csslintrc', '/config/lints/.csslintrc');
		this._copyTemplates('config/lints/_htmlhint-n-rc', '/config/lints/.htmlhint-n-rc');
		this._copyTemplates('config/lints/_htmlhint-t-rc', '/config/lints/.htmlhint-t-rc');
		this._copyTemplates('config/lints/_jscsrc', '/config/lints/.jscsrc');
		this._copyTemplates('config/lints/_jshintrc', '/config/lints/.jshintrc');
		this._copyTemplates('config/lints/_jshintrc', '/config/lints/.jshintrc');
		this._copyTemplates('config/_banner.json', '/config/banner.json', {
			projectName: this.appPath,
			projectVersion: "0.0.0"
		});
		this._copyTemplates('config/_servefiles.json', '/config/servefiles.json');
		this._copyTemplates('config/_server.env.js', '/config/server.env.js');		
		this._copyTemplates('config/build/_copy-build.js', '/config/build/copy-build.js');
		this._copyTemplates('config/build/_optimize-build.js', '/config/build/optimize-build.js');

		this._copyTemplates('src/apps/router/_routes.js', '/src/apps/router/routes.js');
		this._copyTemplates('src/apps/views/__baseView.js', '/src/apps/views/_baseView.js');
		this._copyTemplates('src/apps/views/_aboutView.js', '/src/apps/views/aboutView.js');
		this._copyTemplates('src/apps/views/_homeView.js', '/src/apps/views/homeView.js');
		this._copyTemplates('src/templates/_homeTpl.html', '/src/templates/homeTpl.html');
		this._copyTemplates('src/templates/_aboutTpl.html', '/src/templates/aboutTpl.html');
		this._copyTemplates('src/_index.html', '/src/index.html');
		this._copyTemplates('src/_main.js', '/src/main.js');
		this._copyTemplates('src/systems/utilities/_hb-template-mapper.js', '/src/systems/utilities/hb-template-mapper.js');


		// this.fs.copyTpl(
		// 	this.templatePath('_Gruntfile.js'),
		// 	this.destinationPath(this.appPath + '/Gruntfile.js')
		// );

	}
});