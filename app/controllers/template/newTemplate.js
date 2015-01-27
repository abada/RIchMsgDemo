var _args = arguments[0] || {};
Ti.API.error(">>>> newTemplate --->>>> ", _args); 

$.title.text = "New Template";

$.saveBtn.title = "Save";

var templateFiles = Alloy.Collections.instance('templateFile');

templateFiles && templateFiles.fetch();

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

function _doSave(e) {

	var path = Ti.Filesystem.getFile(Ti.Filesystem.getApplicationCacheDirectory() , 'tempFile');

	if (!path.exists()) {
		path.createDirectory();
	} 
    var tempFile = Titanium.Filesystem.getFile(path.nativePath,$.newFileName.value + '.html');
     tempFile.write($.newContent.value);

Ti.API.error(">>>> newTemplate --->>>> ", tempFile); 
    var templateGroups =  Alloy.createModel('templateGroup', {
   	    templategroupid :$.newTemName.value,
		templatefileid : $.newFileName.value,
		properties : " "
	});
	templateGroups.save();

	var templateFiles = Alloy.createModel('templateFile', {
		templatefileid : $.newFileName.value,
		filepath : tempFile.resolve(),
		isdelete : false,
		ismain : true
	});
	templateFiles.save();

Ti.API.error(">>>> newTemplate --->>>> ", templateFiles.get("filepath")); 


	App.router.navigate("newTemplate/" + templateFiles.get("templatefileid") + "/templateGroup", {
			navGroup : self.navGroup,
			tabGroup : self.tabGroup
		});
}


function _doBack(e){
	$.me.close();
}

