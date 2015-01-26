var _args = arguments[0] || {};
Ti.API.error(" >>>1111111111111 try to add mail info at maillist", _args); 

$.title.text = "testTemplate";

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
		tempgroupID : _args.params[0],
		testData : _args.data.testData
		// demoType : _args.data.demoType
	},
	navGroup : _args.navGroup || undefined,
	tabGroup : _args.tabGroup || undefined,
};

Ti.API.error(" >>> try to add mail info at maillist", self.DATA.tempgroupID); 

// ================================ Functions ====================================== //

function draw() {

	var items = [];

	_.each(templateGroups.where({templategroupid : self.DATA.tempgroupID}), function(templateGroup, index) {

		items.push({template : 'template',tempBtn : {title : templateGroups.get("templatefileid")}
		});
	});
	$.testSection.setItems(items);
}


function _doItemClick(e) {

	var templateFiles = Alloy.Collections.instance('templateFile');

	templateFiles && templateFiles.fetch();
	
	_.each(templateFiles.where({
		isdelete : 0
	}), function(templateFile, index) {

		App.router.navigate("testTemplate/" + templateFile.get("templatefileid") + "/temp", {
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

	// App.router.navigate("testTemplate/" + self.DATA.tempgroupID + "/newTemplate", {
// 		
			// navGroup : self.navGroup,
			// tabGroup : self.tabGroup
		// });
}

function _doBack(e) {
	$.me.close();
}

