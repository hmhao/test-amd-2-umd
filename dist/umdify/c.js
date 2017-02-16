
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(['require', 'jquery', 'vendor/inherit'], factory);
  } else if (typeof exports === "object") {
    module.exports = factory(require);
  }
})(this, function(require) {

var $ = require('jquery');
var inherit = require('vendor/inherit');

  
	var C = inherit(new function() {



	});

	return C;
});

