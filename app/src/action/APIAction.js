var AppDispatcher = require('../core/AppDispatcher');
var ActionType = require('./ActionType');

function APIAction(){
	this.session = true;
	this.initialized = false;
}

APIAction.prototype.init = function init(){
	AppDispatcher.dispatch({
		type: ActionType.COMPANIES,
		url: <api-url>
	});
	this.initialized = true;
}

APIAction.prototype.login = function login(){

}

APIAction.prototype.logout = function logout(){
	
}

module.exports = new APIAction();