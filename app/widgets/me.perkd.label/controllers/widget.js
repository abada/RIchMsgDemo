var args = arguments[0] || {}, props = [
	'font', 'minimumFontSize',
	'textAlign', 'verticalAlign',
	'wordWrap', 'color', 'autoLink', 'text', 'ellipsize', 'html',
	'color', 'highlightedColor', 'tintColor',
	'left', 'right', 'top', 'bottom', 'width', 'height',
	'shadowColor', 'shadowOffset', 'shadowRadius',
	'backgroundColor', 'backgroundGradient', 'backgroundImage', 'backgroundLeftCap', 'backgroundTopCap', 'backgroundRepeat',
	'borderColor', 'borderWidth', 'borderRadius',
	'opacity', 'touchEnabled', 'visible', 'zIndex', 'bubbleParent'];

var self = {
	minFontSize : parseInt(args.minimumFontSize) || 12,
	maxFontSize : parseInt(args.font.fontSize) || 30,
	oriVisible : $.theLabel.visible,
};

applyProperties(args);

OS_ANDROID && $.theLabel.setVisible(false);

function hide() {
	$.theLabel.hide();
	self.oriVisible = false;
	 
	return;
}

function show() {
	$.theLabel.show();
	self.oriVisible = true;

	return;
}

function applyProperties(properties) {
	if (properties.minimumFontSize) {
		self.minFontSize = parseInt(properties.minimumFontSize);
	}

	if (properties.font && properties.font.fontSize) {
		self.maxFontSize = parseInt(properties.font.fontSize);
	}

	properties = _.omit(properties, 'id', '__parentSymbol', '__itemTemplate', '$model');

	if (properties.textid) {// https://jira.appcelerator.org/browse/TC-2363
		properties.text = L(properties.textid);
		delete properties.textid;
	}

	var labelProperties;
	labelProperties = properties;

	if (labelProperties.left && labelProperties.right && !labelProperties.width) {
		labelProperties.width = Ti.UI.FILL;
	}
	$.theLabel.applyProperties(labelProperties);

	return;
}

if (OS_ANDROID) {
	exports.animate = function(_args, _callback) {
		$.theLabel.animate(_args, _callback);
	};
} else {
	exports.animate = $.theLabel.animate;
}

exports.applyProperties = applyProperties;
exports.getText = function() {
	return $.theLabel.text;
};
exports.setText = function(text) {
	$.theLabel.text = text;
};
exports.hide = hide;
exports.show = show;

Object.defineProperty($, "text", {
	get : exports.getText,
	set : exports.setText
});

Object.defineProperty($, "color", {
	get : function() {
		return $.theLabel.color;
	},
	set : function(color) {
		$.theLabel.setColor(color);
	}
});

Object.defineProperty($, "visible", {
	get : function() {
		return $.theLabel.visible;
	},
	set : function(value) {
		self.oriVisible = value;
		$.theLabel.visible = value;
	}
});

function _onPostlayout(e) {

	Ti.API.info("me.perkd.listindex _onPostlayout " + $.theLabel.size.width + ", " + $.theLabel.size.height);

	var width = $.theLabel.size.width;
	var height = $.theLabel.size.height;
	var text = $.theLabel.text;

	var fontFamily = $.theLabel.font.fontFamily;

	var module = require("me.perkd.android.uihelper");

	var size = module.calcFontSize({
		width : width.toString(),
		height : height.toString(),
		fontFamily : fontFamily,
		text : text,
		minSize : self.minFontSize.toString(),
		maxSize : self.maxFontSize.toString()
	});

	size = Math.floor(size);

	Ti.API.info("font size is " + size);
	$.theLabel.applyProperties({
		font : {
			fontSize : size + "dp",
			fontFamily : fontFamily,
		},
	});
	$.theLabel.setVisible(self.oriVisible);

}