var _args = arguments[0] || {};

Ti.API.error(" >>> try to add mail info at maillist", _args); 

$.title.text = "Test";

$.saveBtn.title = "Save";

var richMessages = Alloy.Collections.instance('richMessage');

richMessages && richMessages.fetch();

var self = {
	// ===== define events here =====
	EVENT : {
		// --- listen ---
		// --- fire ---
	},
	// ===== DATA from router =====
	DATA : {
		richID : _args.params[0],
		testData : _args.data.testData
		// demoType : _args.data.demoType
	},
	navGroup : _args.navGroup || undefined,
	tabGroup : _args.tabGroup || undefined,
};

$.testName.value = self.DATA.richID;


// ================================ Functions ====================================== //

function _doTempClick(e) {

		App.router.navigate("test/" + self.DATA.testData.templategroupid + "/testTemplate", {
			data : {
				testData : self.DATA.testData
				// testData : richMessage.toJSON(),
				// demoType : ('5A0582' == self.DATA.cardData.masterID || '5A0492' == self.DATA.cardData.masterID) ? 'tbl' : 'tbs'
			},
			navGroup : self.navGroup,
			tabGroup : self.tabGroup
		});
}


function _doParamClick(e) {

		App.router.navigate("test/" + self.DATA.testData.properties + "/parameter", {
			data : {
				// properties:self.DATA.testData.properties
				// testData : richMessage.toJSON(),
				// cardID : self.DATA.cardID
				// demoType : ('5A0582' == self.DATA.cardData.masterID || '5A0492' == self.DATA.cardData.masterID) ? 'tbl' : 'tbs'
			},
			navGroup : self.navGroup,
			tabGroup : self.tabGroup
		});
}


function close() {
	(self.tabGroup || self.navGroup) ? $.me.fireEvent(App.Event.NAV_BACK) : $.me.close();
}  

function _doSave(e){
	
	_.each(richMessages.where({id : self.DATA.testData.id}), function(richMessage, index) {
				richMessage.set({
					richid : $.testName.value,
				});
				richMessage.save();
			});
	var controller = Alloy.createController("index");
    controller.getView().open();
}

function _doBack(e){
	$.me.close();
}

function _doRender(){
	
   var webview = Alloy.createController('test/render').getView();


	var path = Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory(), '/templates/body.html');
	// var root = Ti.Filesystem.getApplicationCacheDirectory();
	// var path = Ti.Filesystem.getFile(Ti.Filesystem.getApplicationCacheDirectory() , 'V3FKv6h/10/body.html');

	var ejs = require("ejs");

	args.filename = path.resolve();

	var ret = ejs.render(path.read().getText(), args);

	Ti.API.info("retretretretretretretret", ret);
	
	webview.setHtml(ret); 

}

