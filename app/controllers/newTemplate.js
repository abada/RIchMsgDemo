$.title.text = "Templates";

$.saveBtn.text = "Save";

function _doSave(e){
	Alloy.createController("templates").getView().Open();
}

function _doBack(e){
	Alloy.createController("templates").getView().Open();
}
