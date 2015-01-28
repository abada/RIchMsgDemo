var _args = arguments[0] || {};

Ti.API.error(" >>> testTemplate --->>>> ",_args);
var templateGroups = Alloy.Collections.instance('templateGroup');

templateGroups && templateGroups.fetch();

var self = {
	// ===== define events here =====
	EVENT : {
		// --- listen ---
		// --- fire ---
	},
	// ===== DATA from router =====
	DATA : {
		tempGroupID : _args.params[0],
		tempFileID : _args.data.templateFileID
		// demoType : _args.data.demoType
	},
	navGroup : $.navGroup,
	tabGroup : $.tabGroup,
};


// ================================ Event Handlers ================================= //



function _onOpen() {

    Ti.API.error(" >>> testTemplate --->>>> ");
    
	var tempGroupID = self.DATA.tempGroupID;
	var tempFileID = self.DATA.tempFileID;

	_.each(templateGroups.where({
		templategroupid : tempGroupID
	}), function(templateGroup, index) {
		
		var argsStr = templateGroup.get("properties");
		var argsJson = JSON.parse(argsStr);

       Ti.API.error(" >>> testTemplate --->>>> ", argsJson); 
		var path = Ti.Filesystem.getFile(Ti.Filesystem.getApplicationCacheDirectory(), 'tempFile/' + tempFileID + '.html');
		Ti.API.error(" >>> testTemplate --->>>> ", path); 
		
		var ejs = require("ejs");

		argsJson.filename = path.resolve();

		var ret = ejs.render(path.read().getText(), argsJson);

		$.webview.setHtml(ret);
	});
}

function _onClose(e) {
	$.destroy();
	// must do destroy when window closed.
}

function close() {
	(self.tabGroup || self.navGroup) ? $.me.fireEvent(App.Event.NAV_BACK) : $.me.close();
}

function _doBack(e) {

	$.me.close();
}

