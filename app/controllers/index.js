// $.navBar.title = "Rich Message Test";
// 
// $.navBar.rightNavImage = "/images/addbtn.png";
// $.navBar.rightNavBtn.addEventListener('click',function(){
// 	
	// Alloy.createController("newRichMsg").getView().Open();
// });

$.title.text = "Rich Message Test";


// var profiles = [{
    // testLab : "Test1",
    // // nextImg : "/images/next.png"
// }, {
    // testLab : "Test2",
    // // nextImg : "/images/next.png"
// }, {
    // testLab : "Test3",
    // // nextImg : "/images/next.png"
// }]; 
// 
function _onOpen(e) {
//     
    // var items = [];
//     
    // _.each(profiles, function(profile) {
        // items.push({template : 'template', testBtn : {text : profile.testBtn}});
    // });
//     
    // $.testSection.setItems(items);
}

function _doItemClick(e) { 
    
    var controller = Alloy.createController("test");
    
    controller.getView().open();
}

function _doAdd(e){
	Alloy.createController("newRichMsg").getView().Open();
}

$.index.open();