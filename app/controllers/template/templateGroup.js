var _args = arguments[0] || {};

Ti.API.error(" >>> try to add mail info at maillist", _args);
$.title.text = "Templates";

var templateFiles = Alloy.Collections.instance('templateFile');

templateFiles && templateFiles.fetch();

Ti.API.error(" >>> try to add mail info at maillist", templateFiles.toJSON());

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
		tempFileID : _args.params[0],
		// testData : _args.data.testData
		// demoType : _args.data.demoType
	},
	navGroup : $.navGroup,
	tabGroup : $.tabGroup
};

Ti.API.error(" >>> try to add mail info at maillist", self.DATA.tempFileID);
// ================================ Functions ====================================== //

function draw() {

	var items = [];

	_.each(templateFiles.where({templatefileid : self.DATA.tempFileID}), function(templateFile, index) {

		items.push({template : 'template',tempBtn : {title : templateFile.get("templatefileid")}
		});
	});
	$.testSection.setItems(items);
}

function _doItemClick(e) {

	_.each(templateFiles.where({
		isdelete : 0
	}), function(templateFile, index) {

		App.router.navigate("testTemplate/" + templateFiles.get("templatefileid") + "/temp", {
			data : {
				templateData : templateFile.toJSON(),
				// demoType : ('5A0582' == self.DATA.cardData.masterID || '5A0492' == self.DATA.cardData.masterID) ? 'tbl' : 'tbs'
			},
			navGroup : self.navGroup,
			tabGroup : self.tabGroup
		});
	});
}
// ================================ Event Handlers ================================= //

function _onOpen() {
	draw();
}

function _onClose(e) {
	$.destroy();
	// must do destroy when window closed.
}

function close() {
	(self.tabGroup || self.navGroup) ? $.me.fireEvent(App.Event.NAV_BACK) : $.me.close();
}

function _doAdd(e) {

	var controller = Alloy.createController("template/newTemplate");

	controller.getView().open();
}


function _doBack(e) {

    Ti.API.error(" ########################", self.DATA.tempFileID);
   
	if (_.size(templateGroups.where({
		templatefileid : self.DATA.tempFileID
	})) > 0) {
		_.each(templateGroups.where({
			templatefileid : self.DATA.tempFileID
		}), function(templateGroup, index) {

			App.router.navigate("test/" + templateGroup.get("templategroupid") + "/template/" + templateGroup.get("properties"), {
				navGroup : self.navGroup,
				tabGroup : self.tabGroup
			});
		});
	}else{
		var controller = Alloy.createController("test/newRichMessage");

	controller.getView().open();
	}

}

