var _args = arguments[0] || {};

$.title.text = "Template";

$.saveBtn.title = "Save";

Ti.API.error(" >>> try to add mail info at maillist", _args);

var self = {
	// ===== define events here =====
	EVENT : {
		// --- listen ---
		// --- fire ---
	},
	// ===== DATA from router =====
	DATA : {
		templatefileid : _args.params[0],
		templateData : _args.data.templateData
		// demoType : _args.data.demoType
	},
	navGroup : _args.navGroup || undefined,
	tabGroup : _args.tabGroup || undefined,
};

// ================================ Functions ====================================== //

function draw() {

	_.each(templateFiles.where({templatefileid : self.DATA.templatefileid}), function(templateFile, index) {

       $.templateFileName.value = templateFile.get("templatefileid");
       $.templateContent.value = templateFile.get("templatecontent");
	});
}

// ================================ Event Handlers ================================= //

function _onOpen() {
	draw();
}

function close() {
	(self.tabGroup || self.navGroup) ? $.me.fireEvent(App.Event.NAV_BACK) : $.me.close();
} 


function _doSave(e){
	
	_.each(templateGroups.where({id : self.DATA.templateData.id}), function(templateGroup, index) {
				templateGroup.set({
					templategroupid : $.newTemName.value,
				});
               templateGroup.save();
			});
	var controller = Alloy.createController("template/templateGroup");
    controller.getView().open();
    
}

function _doBack(e){
	
	$.me.close();
}
