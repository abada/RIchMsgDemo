$.title.text = "Parameter";

$.saveBtn.text = "Save";

function _doSave(e){
	Alloy.createController("newRichMsg").getView().Open();
}

function _doBack(e){
	Alloy.createController("newRichMsg").getView().Open();
}
