var _args = arguments[0] || {};

$.title.text = "New Rich Message";

$.saveBtn.title = "Save";

var richMessage = Alloy.Collections.instance('richMessage');

richMessage && richMessage.fetch();

var self = {
	// ===== define events here =====
	EVENT : {
		// --- listen ---
		// --- fire ---
	},
	// ===== DATA from router =====
	DATA : {
		tempGroupID : _args.params[0],
		properties : _args.param[1]
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

function _doSave(e){
	
	var richMessage = Alloy.createModel('richMessage', {
                            richid : $.newRichName.value,
                            properties : self.DATA.properties,
                            templategroupid : self.DATA.tempGroupID,
                            isdelete : false
                        }); 
                        richMessage.save();
	
	var controller = Alloy.createController("index");
    controller.getView().open();
}

function _doBack(e){
	
	$.me.close();
}

function _doTempClick(e) { 
    
    var tempFileId = " ";
    
    App.router.navigate("newTemplate/" + tempFileId + "/templateGroup", {
			navGroup : self.navGroup,
			tabGroup : self.tabGroup
		});
}

function _doParamClick(e) { 
    
    var properties = " ";
    App.router.navigate("test/" + properties + "/parameter", {
			navGroup : self.navGroup,
			tabGroup : self.tabGroup
		});
}

