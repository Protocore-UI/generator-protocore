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
		this._copyTemplates('_bowerrc', '/.bowerrc');
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
		this._copyTemplates('src/templates/_homeTpl.html', '/src/templates/homeTpl.html', {
			projectName: this.appPath,
			projectVersion: "0.0.0"
		});
		this._copyTemplates('src/templates/_aboutTpl.html', '/src/templates/aboutTpl.html', {
			projectName: this.appPath,
			projectVersion: "0.0.0"
		});
		this._copyTemplates('src/_index.html', '/src/index.html', {
			projectName: this.appPath,
			projectVersion: "0.0.0"
		});
		this._copyTemplates('src/_main.js', '/src/main.js');
		this._copyTemplates('src/systems/utilities/_hb-template-mapper.js', '/src/systems/utilities/hb-template-mapper.js');

		this._copyTemplates('src/stylesheets/less/_consolidate.less', '/src/stylesheets/less/_consolidate.less');
		this._copyTemplates('src/stylesheets/less/base/_base.less', '/src/stylesheets/less/base/_base.less');
		this._copyTemplates('src/stylesheets/less/base/_imports.less', '/src/stylesheets/less/base/_imports.less');
		this._copyTemplates('src/stylesheets/less/base/_normalize.less', '/src/stylesheets/less/base/_normalize.less');
		this._copyTemplates('src/stylesheets/less/common/_fonts.less', '/src/stylesheets/less/common/_fonts.less');
		this._copyTemplates('src/stylesheets/less/common/_imports.less', '/src/stylesheets/less/common/_imports.less');
		this._copyTemplates('src/stylesheets/less/common/_readymade.less', '/src/stylesheets/less/common/_readymade.less');
		this._copyTemplates('src/stylesheets/less/common/_variables.less', '/src/stylesheets/less/common/_variables.less');
		this._copyTemplates('src/stylesheets/less/layout/_layout.less', '/src/stylesheets/less/layout/_layout.less');
		this._copyTemplates('src/stylesheets/less/layout/_imports.less', '/src/stylesheets/less/layout/_imports.less');
		this._copyTemplates('src/stylesheets/less/modules/_imports.less', '/src/stylesheets/less/modules/_imports.less');
		this._copyTemplates('src/stylesheets/less/modules/_modules.less', '/src/stylesheets/less/modules/_modules.less');
		this._copyTemplates('src/stylesheets/less/state/_state.less', '/src/stylesheets/less/state/_state.less');
		this._copyTemplates('src/stylesheets/less/state/_imports.less', '/src/stylesheets/less/state/_imports.less');
		this._copyTemplates('src/stylesheets/less/theme/_theme.less', '/src/stylesheets/less/theme/_theme.less');
		this._copyTemplates('src/stylesheets/less/theme/_imports.less', '/src/stylesheets/less/theme/_imports.less');

		// this._copyTemplates('src/assets/fonts/segoeui.ttf', '/src/assets/fonts/segoeui.ttf');
		this._copyTemplates('src/assets/images/dev_profile.jpeg', '/src/assets/images/dev_profile.jpeg');

		this._copyTemplates('tests/apps/views/__baseView.js', '/tests/apps/views/_baseView.js');
		this._copyTemplates('tests/libs/qunit/plugins/_qunit.modules.js', '/tests/libs/qunit/plugins/qunit.modules.js');
		this._copyTemplates('tests/_index.html', '/tests/index.html', {
			projectName: this.appPath,
			projectVersion: "0.0.0"
		});
		this._copyTemplates('tests/_main.js', '/tests/main.js');
		this._copyTemplates('tests/_testSuite.js', '/tests/testSuite.js');

		this._copyTemplates('_Gruntfile.js', '/Gruntfile.js', {
			pkgAppName: "<%= pkg.application.name %>",
			pkgAppVersion: "<%= pkg.application.version %>",
			buildTags: "<%= buildTags %>",
			cfUsebanner: "<%= configuredFiles.usebanner %>",
			cfJshintIgnore: "<%= configuredFiles.jshint.ignore %>",
			cfJshintFiles: "<%= configuredFiles.jshint.files %>",
			cfJscsFiles: "<%= configuredFiles.jscs.files %>",
			cfJsonlint: "<%= configuredFiles.jsonlint %>",
			cfCsslintIgnore: "<%= configuredFiles.csslint.ignore %>",
			cfCsslintFiles: "<%= configuredFiles.csslint.files %>",
			cfHtmlhintRoot_HTML_FilesIgnore: "<%= configuredFiles.htmlhint.Root_HTML_Files.ignore %>",
			cfHtmlhintRoot_HTML_FilesFiles: "<%= configuredFiles.htmlhint.Root_HTML_Files.files %>",
			cfHtmlhintTemplatesIgnore: "<%= configuredFiles.htmlhint.Templates.ignore %>",
			cfHtmlhintTemplatesFiles: "<%= configuredFiles.htmlhint.Templates.files %>",
			cfLessReadyMadeFiles: "<%= configuredFiles.less.readyMade.files %>",
			cfLessCustomMadeFiles: "<%= configuredFiles.less.customMade.files %>",
			cfWatchLessFiles: "<%= configuredFiles.watch.less.files %>",
			cfHtmlminFiles: "<%= configuredFiles.htmlmin.files %>"
		});
	}
});