// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};


var App = Alloy.Globals;

var Router = require('router');
_.extend(Router.prototype, {
	routes : {
		'index/:rid/test' : 'test/test',
		'test/:gid/testTemplate' : 'template/testTemplate',
		'testTemplate/:gid/temp' : 'template/temp',
		'test/:properties/parameter' : 'parameter/parameter',
		'testTemplate/:gid/newTemplate' : 'template/newTemplate',
		'test/:gid/template/:properties' : 'test/newRichMessage',
		'newTemplate/:fid/templateGroup' : 'template/templateGroup',
		'test/:properties/render' : 'test/render'
	},
});
App.router = new Router(); 
