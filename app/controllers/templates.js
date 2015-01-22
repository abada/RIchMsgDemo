$.title.text = "Templates";

$.saveBtn.text = "Save";

function _doSave(e){
	Alloy.createController("index").getView().Open();
}

function _doBack(e){
	Alloy.createController("index").getView().Open();
}


function _doTempClick(e) { 
    
    var controller = Alloy.createController("template");
    
    controller.getView().open();
}





// $.navBar.title = "Templates";
// 
// $.navBar.rightNavImage = "/images/addbtn.png";
// $.navBar.rightNavBtn.addEventListener('click',function(){
	// Alloy.createController("newTemplate").getView().Open();
// });
