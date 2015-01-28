var _args = arguments[0] || {};

var templateFiles = Alloy.Collections.instance('templateFile');

templateFiles && templateFiles.fetch();

var templateGroups = Alloy.Collections.instance('templateGroup');

templateGroups && templateGroups.fetch();


$.title.text = "Template";

$.saveBtn.title = "Save";

Ti.API.error(" >>> temp --->>>> ", _args);

var self = {
	// ===== define events here =====
	EVENT : {
		// --- listen ---
		// --- fire ---
	},
	// ===== DATA from router =====
	DATA : {
		templateFileID : _args.params[0],
		templateData : _args.data.templateData,
		templateGroupID : _args.data.templateGroupID
		// demoType : _args.data.demoType
	},
	navGroup : _args.navGroup || undefined,
	tabGroup : _args.tabGroup || undefined,
};

// ================================ Functions ====================================== //

function draw() {

    var path = Ti.Filesystem.getFile(Ti.Filesystem.getApplicationCacheDirectory() , 'tempFile');

    var tempFile = Titanium.Filesystem.getFile(path.nativePath,self.DATA.templateFileID + '.html');
    
    var resources = tempFile.read().text;
    
    Ti.API.error(" >>> temp --->>>> ", tempFile.read().text);
    // resources.en_us.foo = 'baz'; //bar becomes baz
    // newFile.write(JSON.stringify(resources));
     
	// _.each(templateFiles.where({templatefileid : self.DATA.templatefileid}), function(templateFile, index) {

       $.templateGroupName.value = self.DATA.templateGroupID;
       $.templateContent.value = resources;
	// });
}

// ================================ Event Handlers ================================= //

function _onOpen() {
	draw();
}

function close() {
	(self.tabGroup || self.navGroup) ? $.me.fireEvent(App.Event.NAV_BACK) : $.me.close();
} 

function _onClose(e) {
	$.destroy();
	// must do destroy when window closed.
}

function _doSave(e){
	

	_.each(templateGroups.where({
		templategroupid : self.DATA.templateGroupID
	}), function(templateGroup, index) {
		templateGroup.set({
			templategroupid : $.templateGroupName.value,
		});
		templateGroup.save();
		App.router.navigate("test/" + templateGroup.get("templategroupid") + "/testTemplate", {
			data : {
				testData : templateGroup.toJSON()
				// testData : richMessage.toJSON(),
				// demoType : ('5A0582' == self.DATA.cardData.masterID || '5A0492' == self.DATA.cardData.masterID) ? 'tbl' : 'tbs'
			},
			navGroup : self.navGroup,
			tabGroup : self.tabGroup
		});
	});

	// var controller = Alloy.createController("template/testTemplate");
    // controller.getView().open();
//     
}

function _doBack(e){
	
	$.me.close();
}
