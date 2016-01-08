var AppDispatcher = require('../core/AppDispatcher');
var ActionType = require('./ActionType');

function APIAction(){
	this.session;
	this.initialized = false;
}

APIAction.prototype.init = function(){
	console.log("dispatched");
	AppDispatcher.dispatch({
		type: ActionType.COMPANIES,
		url: null
	});
	this.initialized = true;
}

APIAction.prototype.login = function(){

}

APIAction.prototype.logout = function(){
	
}

module.exports = new APIAction();