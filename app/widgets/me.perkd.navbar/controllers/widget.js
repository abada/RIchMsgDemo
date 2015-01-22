// __parentSymbol is the host window

var args =	arguments[0] || {},
			children = args.children || [];

var self = {
	isHidden		: false,
	customBackNav	: false
};

function configure(parent) {
}

function hide(animate) {
	self.isHidden = true;
	
	if (animate) {
	    var anim = Ti.UI.createAnimation({ top: -120, duration: 60, curve: Ti.UI.ANIMATION_CURVE_EASE_IN });
	    $.bkgd.animate(anim);
	    $.titleBar.animate(anim);
	} else {
	    $.titleBar.top = -Alloy.CFG.UI.navBar.height;
	    $.bkgd.opacity = 0;
	}
}

function show(animate) {
	self.isHidden = false;
	
    if (animate) {
        var anim = Ti.UI.createAnimation({ top: 0, duration: 220, curve: Ti.UI.ANIMATION_CURVE_EASE_OUT });
        $.bkgd.animate(anim);
        $.titleBar.animate(anim);
    } else {
        $.titleBar.top = 0;
        $.bkgd.opacity = 1;
    }
}

function back() {
	if (__parentSymbol.__navGroup || __parentSymbol.__tabGroup) {
		__parentSymbol.fireEvent(App.Event.NAV_BACK);
	} else {
		__parentSymbol.close();
	}
}

//  TODO methods below NOT implemented yet

function barColor(color) {
}

function barImage(imageURL) {
}

function translucent(isTranslucent) {
}

function navTintColor(color) {
}

function titleControl(view) {
}

function applyTitleProperties(props) {
	$.myTitle.applyProperties(props);
}

function destroy() {
	__parentSymbol.addEventListener('close', destroy);

	if (OS_ANDROID) {
        __parentSymbol.removeEventListener('androidback', back);
	}
}


//  private functions

function _addChildComponent(child) {

	if (!child)		return;	// Alloy bug?: when child view has 'platform="ios"', on Android child == undefined

	//--- handle left & right navButtons
	if (child.id == $.leftNavButton.id || child.id == $.rightNavButton.id) {
	    var apply = _.pick(child,
	        'width', 'height',
	        'top', 'right', 'bottom', 'left', 'center',
	        'backgroundColor', 'backgroundGradient', 'backgroundImage', 'backgroundLeftCap', 'backgroundTopCap', 'backgroundRepeat',
	        'borderColor', 'borderWidth', 'borderRadius',
	        'opacity', 'visible', 'enabled',
	        'font', 'textAlign', 'verticalAlign',
	        'color', 'shadowOffset', 'shadowColor',
	        'icon', 'type', 'iconSize', 'iconPosition',  'padding', 'spacing', 
			'style', 'activeStyle', 'disabledStyle',
	        'bubbleParent'
	    );
		child.visible = false;

		self.customBackNav = self.customBackNav || (child.id == $.leftNavButton.id);
		var theButton = (child.id == $.leftNavButton.id) ? $.leftNavButton : $.rightNavButton;
		theButton.applyProperties(apply);

		//--- use the child button as an event proxy to the controller
		theButton.title = child.title || ' ';		// TODO [ZJ]   I18N support
		theButton.on('click', function(e) {
			e.source = theButton;
			child.fireEvent('click', e);
		});
		theButton.show();

	} else {
		//--- handle other views being added to navBar
		$.addClass(child, child.id);
		$.titleBar.add(child);
	}
}

function _doOpen() {
	__parentSymbol.removeEventListener('open', _doOpen);

	if (!$.myTitle.text) {
		$.myTitle.text =  __parentSymbol.title;
	}

	if (__parentSymbol.__navGroup || __parentSymbol.__tabGroup) {
		// add default leftNavButton when native navBar absent & no custom leftNavButton & not 1st window of navGroup

		var nativeNavBar = !(undefined == __parentSymbol.navBarHidden || __parentSymbol.navBarHidden);

		if (!(nativeNavBar || self.customBackNav || __parentSymbol.__navRoot)) {
			__parentSymbol.backButtonTitle && ($.leftNavButton.title = __parentSymbol.backButtonTitle);

			$.leftNavButton.on('click', back);
			$.leftNavButton.show();
		}

	} else {

		if (OS_ANDROID) {
			//--  ANDROID Back button managed in order of priority: (1) tabGroup, (2) navGroup,
			//   (3) navBar, when navBar not present, (4) window controller needs to handle it

	        __parentSymbol.addEventListener('androidback', back);

		}
	}
}


Object.defineProperty($, "hidden", {
	get : function() {
		return self.isHidden;
	},
});

Object.defineProperty($, "leftNavTitle", {
	set : function(title) {
		$.leftNavButton.title = title;
		$.leftNavButton.visible || $.leftNavButton.show();
	},
});

Object.defineProperty($, "rightNavTitle", {
	set : function(title) {
		$.rightNavButton.title = title;
		$.rightNavButton.visible || $.rightNavButton.show();
		$.myTitle.applyProperties({
			left: 45, right: 45,
		});
	},
});

Object.defineProperty($, "title", {
	set : function(title) {
		$.myTitle.text = title;
	},
	get : function() {
		return $.myTitle.text;
	}
});

__parentSymbol.addEventListener('open', _doOpen);
__parentSymbol.addEventListener('close', destroy);
_.each(children, _addChildComponent);

//==========  EXPORTS  ===============
exports.configure = configure;
exports.hide = hide;
exports.show = show;
exports.back = back;
exports.applyTitleProperties = applyTitleProperties;

