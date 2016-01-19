var AppDispatcher = require('../core/AppDispatcher');
var ActionType = require('./ActionType');

function APIAction(){
	this.session = true;
	this.initialized = false;
}

APIAction.prototype.init = function init(){
	console.log("dispatched init");
	AppDispatcher.dispatch({
		type: ActionType.COMPANIES,
		url: "http://bruinclub.herokuapp.com/api/companies/"
	});
	this.initialized = true;
}

APIAction.prototype.login = function login(){

}

APIAction.prototype.logout = function logout(){
	
}

module.exports = new APIAction();