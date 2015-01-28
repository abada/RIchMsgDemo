var _args = arguments[0] || {};

Ti.API.info(">>>> newRichMessage --->>>> ", _args);

$.title.text = "New Rich Message";

$.saveBtn.title = "Save";

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
		// tempGroupID : _args.params[0],
		// properties : _args.param[1]
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
                            properties : _args.params[1],
                            templategroupid :_args.params[0],
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

	var tempID = _args.params[0];
	var properties = " ";
	
	App.router.navigate("test/" + properties + "/parameter", {
		data : {
			templateGroupID : tempID
		},
		navGroup : self.navGroup,
		tabGroup : self.tabGroup
	}); 
}

function _doRender(e) {

    var tempGroupID = _args.params[0];
    
    // var argsStr = _args.params[1];
    // var argsJson = JSON.parse(argsStr);
    
	_.each(templateGroups.where({
		templategroupid : tempGroupID
	}), function(templateGroup, index) {
		
		var tempFileID = templateGroup.get("templatefileid");

		App.router.navigate("test/" + tempGroupID + "/render", {
			data : {
				templateFileID : tempFileID
			},
			navGroup : self.navGroup,
			tabGroup : self.tabGroup
		});
	}); 

    
	// var controller = Alloy.createController("test/render", argsJson);
	// controller.getView().open();
}


