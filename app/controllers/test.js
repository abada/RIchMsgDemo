$.title.text = "Test";

$.saveBtn.title = "Save";

function _doTempItemClick(e) { 
    
    var controller = Alloy.createController("templates");
    
    controller.getView().open();
}

function _doParmClick(e) { 
    
    var controller = Alloy.createController("parmeter");
    
    controller.getView().open();
}

function _doSave(e){
	Alloy.createController("index").getView().Open();
}

function _doBack(e){
	Alloy.createController("index").getView().Open();
}
