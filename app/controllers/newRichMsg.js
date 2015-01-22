$.title.text = "New Rich Message";

$.saveBtn.text = "Save";

function _doSave(e){
	Alloy.createController("index").getView().Open();
}

function _doBack(e){
	Alloy.createController("index").getView().Open();
}








// $.navBar.rightNavBtn.addEventListener('click',_doClickSaveBtn);


// var _saving = false;
// function _doClickSaveBtn(e) {
	// if (_saving)
		// return;
	// _saving = true;
// 
	// var _formdata = $.form.getFieldValues();
	// var valid = App.cardMgr.validateForm(_formdata);
	// if (true != valid) {
		// App.showAlert(valid[0]['msg'], valid[0]['field']);
		// _saving = false;
		// return;
	// }
// 
	// App.cardMgr.updateCard({
		// formData : _formdata,
		// customImages : self.tmpCustomImages || {},
		// changedCustomImages : self.changedCustomImages
	// }, self.DATA.cardID);
// 
	// $.trigger(self.EVENT.cardUpdated, {
		// cardID : self.DATA.cardID,
		// imageChanged : self.changedCustomImages ? true : false
	// });
	// close();
// 
	// App.trackMgr.track(self.aCard, 'edit', {
		// cardMID : self.aCard.masterID,
		// cardID : self.aCard.id
	// });
// }
