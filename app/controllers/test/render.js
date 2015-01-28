var args = arguments[0] || {};

var richMessages = Alloy.Collections.instance('richMessage');

richMessages && richMessages.fetch();

// var self = {
	// // ===== define events here =====
	// EVENT : {
		// // --- listen ---
		// // --- fire ---
	// },
	// // ===== DATA from router =====
	// DATA : {
		// tempGroupID : _args.params[0],
		// tempFileID : _args.data.templateFileID
		// // demoType : _args.data.demoType
	// },
	// navGroup : $.navGroup,
	// tabGroup : $.tabGroup,
// };


// ================================ Event Handlers ================================= //



// function _onOpen() {

	// var tempGroupID = self.DATA.tempGroupID;
	// var tempFileID = self.DATA.tempFileID;
// 
	// _.each(richMessages.where({
		// templategroupid : tempGroupID
	// }), function(richMessage, index) {
		
		// var argsStr = richMessage.get("properties");
		// var argsJson = JSON.parse(argsStr);

		var path = Ti.Filesystem.getFile(Ti.Filesystem.getApplicationCacheDirectory() + 'tempFile/file.html');
		
		var ejs = require("ejs");

		args.filename = path.resolve();

		var ret = ejs.render(path.read().getText(), args);

		$.webview.setHtml(ret);
	// });
// 
// }

// function _onClose(e) {
	// $.destroy();
	// // must do destroy when window closed.
// }
function _doBack(e) {

	$.me.close();
}

