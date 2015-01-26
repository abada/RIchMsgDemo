var routing = false;

if (!_ && ( typeof require !== 'undefined'))
	_ = require('underscore');

// Routers map faux-URLs to actions, and fire events when routes are
// matched. Creating a new one sets its `routes` hash, if not set statically.
function Router(options) {

	this.handlers = [];
	this.history = [];

	_.extend(this, Backbone.Events);
	// make Event-aware

	options || ( options = {});
	if (options.routes)
		this.routes = options.routes;
	this._bindRoutes();
	this.initialize.apply(this, arguments);
}

// Cached regular expressions for matching named param parts and splatted
// parts of route strings.
var optionalParam = /\((.*?)\)/g;
var namedParam = /(\(\?)?:\w+/g;
var splatParam = /\*\w+/g;
var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

// Initialize is an empty function by default. Override it with your own
// initialization logic.
Router.prototype.initialize = function() {
};

// Manually bind a single named route to a callback. For example:
//
//     this.route('search/:query/p:num', 'search', function(query, num) {
//       ...
//     });
//
Router.prototype.route = function(route, name, callback) {
	if (!_.isRegExp(route))
		route = this._routeToRegExp(route);
	if (_.isFunction(name)) {
		callback = name;
		name = '';
	}
	if (!callback)
		callback = this[name];
	var router = this;

	// Add a route. Routes added later may override previous routes.
	this.handlers.unshift({
		route : route,
		callback : function(fragment, args) {

			args = args || {};
			args.options = args.options || {};
			args.data = args.data || {};
			args.params = router._extractParameters(route, fragment);
			if (callback) {

				callback.apply(router, args);

			} else {
				Ti.API.warn('route: ' + name + ' (' + JSON.stringify(args) + ')');

				try {
					var path = name.split(':');
					// detect widget controller.
					if (2 == path.length) {
						var controller = Alloy.createWidget(path[0], path[1], args);
					} else {
						var controller = Alloy.createController(name, args);
					}
					var win = controller.getView();

					if (args.tabGroup) {//  tab group

						win.__tabGroup = args.tabGroup;
						args.tabGroup.activeTab.open(win, args.options);

					} else if (args.navGroup) {//  navigation window

						win.__navGroup = args.navGroup;
						args.navGroup.openWindow(win, args.options);

					} else {

						//  check if window contains navGroup, if so, create it
						var navGroup = controller.getView('navGroup');

						if (navGroup) {

							navGroup.openWindow(win, args.options);
							navGroup.open(args.options);
							navGroup.show();

							win.__navGroup = navGroup;
							win.__navRoot = true;

						} else {//  standalone window

							win.open(args.options);
						}
					}

				} catch(err) {

					
				}
			}

			router.trigger.apply(router, ['route:' + name].concat(args));
			router.trigger('route', name, args);
			return controller || null;
		}
	});
	// return this;
};

// navigate to the page and save fragment into the history.
Router.prototype.navigate = function(fragment, args, passthrough) {
	passthrough = passthrough || false;
	if (!passthrough && routing)
		return null;
	else
		routing = true;

	var controller = null;
	_.any(this.handlers, function(handler) {
		// find handler for this fragment
		if (handler.route.test(fragment)) {

			controller = handler.callback(fragment, args);

			// 1. push onto history

			// this.history.push(fragment);
			return true;
		}
	});

	setTimeout(function() {
		routing = false;
	}, OS_ANDROID ? 1000 : 500);

	return controller;
};

// Bind all defined routes to routes[]. We have to reverse the
// order of the routes here to support behavior where the most general
// routes can be defined at the bottom of the route map.
Router.prototype._bindRoutes = function() {
	// if (!this.routes)
	// return;
	this.routes = _.result(this, 'routes');
	var route,
	    routes = _.keys(this.routes);
	while (( route = routes.pop()) != null) {
		this.route(route, this.routes[route]);
	}
};

// Convert a route string into a regular expression, suitable for matching
// against the current location hash.
Router.prototype._routeToRegExp = function(route) {
	route = route.replace(escapeRegExp, '\\$&').replace(optionalParam, '(?:$1)?').replace(namedParam, function(match, optional) {
		return optional ? match : '([^\/]+)';
	}).replace(splatParam, '(.*?)');
	return new RegExp('^' + route + '$');
};

// Given a route, and a URL fragment that it matches, return the array of
// extracted decoded parameters. Empty or unmatched parameters will be
// treated as `null` to normalize cross-browser behavior.
Router.prototype._extractParameters = function(route, fragment) {
	var params = route.exec(fragment).slice(1);
	return _.map(params, function(param) {
		return param ? decodeURIComponent(param) : null;
	});
};

module.exports = Router;

