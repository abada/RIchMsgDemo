var _args = arguments[0] || {};

Ti.API.error(" >>> render --->>>>", _args);

var self = {
	// ===== define events here =====
	EVENT : {
		// --- listen ---
		// --- fire ---
	},
	// ===== DATA from router =====
	DATA : {
		properties : _args.params[0],
		filePath : _args.params[1]
		// demoType : _args.data.demoType
	},
	navGroup : _args.navGroup || undefined,
	tabGroup : _args.tabGroup || undefined,
};


function render() {
	
	var argsStr = self.DATA.properties;
	
     // var argsJson = JSON.parse(argsStr);
     Ti.API.info(">>>> newRichMessage --->>>> ", typeof argsStr);
// Ti.API.info(">>>> newRichMessage --->>>> ", typeof argsJson);
	var path = self.DATA.filePath;
	var ejs = require("ejs");

	argsStr.filename = path.resolve();

	var ret = ejs.render(path.read().getText(), argsStr);

	Ti.API.info("retretretretretretretret", ret);

	$.webview.setHtml(ret);
}

function _onBack(e) {
	
    close();
}

// ================================ Event Handlers ================================= //
function _onOpen() {
	render();
}

function _onClose(e) {
	$.destroy();
	// must do destroy when window closed.
}

function close() {
	(self.tabGroup || self.navGroup) ? $.me.fireEvent(App.Event.NAV_BACK) : $.me.close();
}  




