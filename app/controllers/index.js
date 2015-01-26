$.title.text = "Rich Message Test";

var richMessages = Alloy.Collections.instance('richMessage');

richMessages && richMessages.fetch();

Ti.API.info("size of richMessage ==> ", _.size(richMessages));

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

// ================================ Functions ====================================== //


function draw() {
	var items = [];

	_.each(richMessages.where({
		isdelete : 0
	}), function(richMessage, index) {

		Ti.API.error(" >>> try to add mail info at maillist", richMessage.toJSON(), index);

		items.push({
			template : 'template',
			testBtn : {
				title : richMessage.get("richid")
			}
		});
	});
	$.testSection.setItems(items);
}

function _doItemClick(e) {

	_.each(richMessages.where({
		isdelete : 0
	}), function(richMessage, index) {

		App.router.navigate("index/" + richMessage.get("richid") + "/test", {
			data : {
				testData : richMessage.toJSON(),
				// demoType : ('5A0582' == self.DATA.cardData.masterID || '5A0492' == self.DATA.cardData.masterID) ? 'tbl' : 'tbs'
			},
			navGroup : self.navGroup,
			tabGroup : self.tabGroup
		});
	});
}

function _doAdd(e) {
	
	// var controller = Alloy.createController("test/newRichMessage");
//     
    // controller.getView().open();

    var properties = "undefine";
    var tempGroupId = "undefine";
    
	App.router.navigate("test/" + tempGroupId + "/template/" + properties, {
			navGroup : self.navGroup,
			tabGroup : self.tabGroup
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

$.index.open();