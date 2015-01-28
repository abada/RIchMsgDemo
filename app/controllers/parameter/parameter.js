var _args = arguments[0] || {};

Ti.API.error(">>>> parameter --->>>> ", _args);

var templateGroups = Alloy.Collections.instance('templateGroup');

templateGroups && templateGroups.fetch();

var self ={
	// ===== define events here =====
	EVENT : {
		// --- listen ---
		// --- fire ---
	},
	// ===== DATA from router =====
	DATA : {
		properties : _args.params[0],
		tempGroupID : _args.data.templateGroupID
		// demoType : _args.data.demoType
	},
	navGroup : _args.navGroup || undefined,
	tabGroup : _args.tabGroup || undefined,
};

Ti.API.error(">>>> parameter -->>>>> ", self.DATA.properties);

$.title.text = "Parameter";

$.saveBtn.title = "Save";

$.newContent.value = self.DATA.properties;

function close() {
	(self.tabGroup || self.navGroup) ? $.me.fireEvent(App.Event.NAV_BACK) : $.me.close();
} 

function _doSave(e){
	
	var properties = $.newContent.value;

	_.each(templateGroups.where({
		templategroupid : self.DATA.tempGroupID
	}), function(templateGroup, index) {
		templateGroup.set({
			properties : properties,
		});
		templateGroup.save();
	}); 

	App.router.navigate("test/" + self.DATA.tempGroupID + "/template/" + properties, {
			navGroup : self.navGroup,
			tabGroup : self.tabGroup
		});
}

function _doBack(e){
	$.me.close();
}
