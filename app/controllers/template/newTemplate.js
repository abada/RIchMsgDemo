var _args = arguments[0] || {};
Ti.API.error(" >>> try to add mail info at maillist", _args); 

$.title.text = "New Template";

$.saveBtn.title = "Save";

var templateFiles = Alloy.Collections.instance('templateFile');

templateFiles && templateFiles.fetch();

var self = {
	// ===== define events here =====
	EVENT : {
		// --- listen ---
		// --- fire ---
	},
	// ===== DATA from router =====
	DATA : {
		// tempgroupID : _args.params[0],
		// demoType : _args.data.demoType
	},
	navGroup : $.navGroup,
	tabGroup : $.tabGroup,
};

// ================================ Event Handlers ================================= //
function _onOpen() {
	// draw();
}

function _onClose(e) {
	$.destroy();
	// must do destroy when window closed.
}

function close() {
	(self.tabGroup || self.navGroup) ? $.me.fireEvent(App.Event.NAV_BACK) : $.me.close();
}


function _doSave(e) {
	
   var templateGroups =  Alloy.createModel('templateGroup', {
		templatefileid : $.newTemName.value,
	});
	templateGroups.save();

	var templateFiles = Alloy.createModel('templateFile', {
		templatefileid : $.newTemName.value,
		templatecontent : $.newContent.value,
		isdelete : false,
		ismain : true

	});
	templateFiles.save();

	App.router.navigate("newTemplate/" + templateFiles.get("templatefileid") + "/templateGroup", {
			navGroup : self.navGroup,
			tabGroup : self.tabGroup
		});
}


function _doBack(e){
	$.me.close();
}

