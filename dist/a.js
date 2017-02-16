;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.A = factory();
  }
}(this, function() {
define(['jquery', 'vendor/inherit'], function($, inherit) {   
	var A = inherit(new function() {



	});

	return A;
});


return A;
}));
