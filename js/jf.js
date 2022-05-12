var H5F = H5F || {};
(function(d){
	
	H5F.setup = function(form) {
		H5F.listen(form,"invalid",H5F.checkField,true);
		H5F.listen(form,"blur",H5F.checkField,true);
		H5F.listen(form,"input",H5F.checkField,true);
	};
	H5F.checkField = function (e) {
		var el = H5F.getTarget(e);
		
		if(el.validity.valid) {
			el.className = "valid";
		} else if(e.type !== "input") {
			if(el.validity.valueMissing) { // User hasn't typed anything
				el.className = "required";
			} else {
				el.className = "error";
			}
		} else if(el.validity.valueMissing) {
			el.className = "";
		}
	};
	
	/* Util methods */
	H5F.listen = function (node,type,fn,capture) {
		if(H5F.isHostMethod(window,"addEventListener")) {
			/* FF & Other Browsers */
			node.addEventListener( type, fn, capture );
		} else if(H5F.isHostMethod(window,"attachEvent") && typeof window.event !== "undefined") {
			/* Internet Explorer way */
			if(type === "blur") {
				type = "focusout";
			} else if(type === "focus") {
				type = "focusin";
			}
			node.attachEvent( "on" + type, fn );
		}
	};
	H5F.preventActions = function (evt) {
		evt = evt || window.event;
		
		if(evt.stopPropagation && evt.preventDefault) {
			evt.stopPropagation();
			evt.preventDefault();
		} else {
			evt.cancelBubble = true;
			evt.returnValue = false;
		}
	};
	H5F.getTarget = function (evt) {
		evt = evt || window.event;
	    return evt.target || evt.srcElement;
	};
	H5F.isHostMethod = function(o, m) {
		var t = typeof o[m], reFeaturedMethod = new RegExp('^function|object$', 'i');
		return !!((reFeaturedMethod.test(t) && o[m]) || t == 'unknown');
	};
	
	H5F.listen(window,"load",function () {
		H5F.setup(d.getElementById("signup"));
	},false);

})(document);