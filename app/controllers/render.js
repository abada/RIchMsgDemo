function _doBack(e){
	Alloy.createController("index").getView().Open();
}





// var args = arguments[0] || {};
// 
// Ti.API.info("$$$$$$$$$$$$$$$$",JSON.stringify(args));
// 
// Ti.API.info("$$$$$$$$$$$$$$$$",typeof args);
// 
// 
// var path = Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory(), '/templates/body.html');
// // var root = Ti.Filesystem.getApplicationCacheDirectory();
// // var path = Ti.Filesystem.getFile(Ti.Filesystem.getApplicationCacheDirectory() , 'V3FKv6h/10/body.html');
// 
// var ejs = require("ejs");
//     
// args.filename = path.resolve();
// 
// var ret = ejs.render(path.read().getText(), args);  
// 
// Ti.API.info("retretretretretretretret",ret);
// $.webview.setHtml(ret);
