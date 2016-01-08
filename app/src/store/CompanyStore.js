var APIAction = require("../action/APIAction");
var AppDispatcher = require('../core/AppDispatcher');
var ActionType = require('../action/ActionType');
var request = require('request');
var util = require('../util/Utils');

function CompanyStore(){
	APIAction.init();
	this.companies = {};
	this.session = APIAction.session;
	this.dispatchToken = AppDispatcher.register(this._onDispatch.bind(this));
}

CompanyStore.prototype.loadCompanies = function(){
	var url = "http://bruinclub.herokuapp.com/api/companies";
	request(url, function(err, response, body){
		this.companies = body;
		this.getCompanies();
	}.bind(this));
}

CompanyStore.prototype.getCompanies = function(){
	return this.companies;
}

CompanyStore.prototype._onDispatch= function(action){
	switch(action.type){
		case ActionType.COMPANIES:
			this.loadCompanies();
			break;
		default:
	}
}


module.exports = new CompanyStore();