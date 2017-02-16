;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.C = factory();
  }
}(this, function() {

define(['jquery', 'vendor/inherit'], function($, inherit) 
{

  
	var C = inherit(new function() {



	});

	return C;
}
);


return C;
}));
