//var APIAction = require('../action/APIAction');

function Utils() {

};

Utils.checkNull = function checkNull(p, msg, a, b, c, d, e, f) {
	if (!p) {
		var args = [a, b, c, d, e, f];
		var argIndex = 0;
		throw new Error(msg.replace(/%s/g, function() {
			return args[argIndex++];
		}));
	}
};

Utils.displayTime = function displayTime(time) {
	var date = new Date(time);
	return date.toLocaleString();
};

Utils.displayNewestTime = function displayNewestTime(time) {
	var date = new Date(time);
	return date.toLocaleDateString();
};


module.exports = Utils;