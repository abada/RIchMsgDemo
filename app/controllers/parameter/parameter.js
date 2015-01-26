var _args = arguments[0] || {};

Ti.API.error(" >>> @@@@@@@@@@@@@@@@@@", _args);

var self ={
	// ===== define events here =====
	EVENT : {
		// --- listen ---
		// --- fire ---
	},
	// ===== DATA from router =====
	DATA : {
		properties : _args.params[0],
		// demoType : _args.data.demoType
	},
	navGroup : _args.navGroup || undefined,
	tabGroup : _args.tabGroup || undefined,
};

Ti.API.error(" >>> @@@@@@@@@@@@@@@@@@", self.DATA.properties);

$.title.text = "Parameter";

$.saveBtn.title = "Save";

$.newContent.value = self.DATA.properties;

function close() {
	(self.tabGroup || self.navGroup) ? $.me.fireEvent(App.Event.NAV_BACK) : $.me.close();
} 

function _doSave(e){
	
	var properties = $.newContent.value;
    var tempGroupId = " ";
    
	App.router.navigate("test/" + tempGroupId + "/template/" + properties, {
			navGroup : self.navGroup,
			tabGroup : self.tabGroup
		});
}

function _doBack(e){
	$.me.close();
}
