var APIAction = require("../action/APIAction");
var AppDispatcher = require('../core/AppDispatcher');
var ActionType = require('../action/ActionType');
var request = require('request');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';
var OTHER_EVENT = '';

function CompanyStore(){
	EventEmitter.call(this);
	this.dispatchToken = AppDispatcher.register(this._onDispatch.bind(this));
	APIAction.init();
	this.companies = [];
	this.displayCompanies = [];
	this.setMaxListeners(0);
}

util.inherits(CompanyStore, EventEmitter);

// CompanyStore.prototype.dispatchToken = AppDispatcher.register(function (action){
// 	console.log("received dispatch");
// 	switch(action.type){
// 		case ActionType.COMPANIES:
// 			debugger
// 			loadCompanies(action.url);
// 			break;
// 		default:
// 			// dispatch not set up
// 	};
// });

CompanyStore.prototype.emitChange = function emitChange() {
	var delay = 300;
	var i;
	this.lastEmit = new Date().getTime();
	setTimeout(function() {
		if (new Date().getTime() - this.lastEmit >= delay) {
			this.emit(CHANGE_EVENT);
		} else {
			this.emit(OTHER_EVENT);
		}
	}.bind(this), delay);
};

CompanyStore.prototype.loadCompanies = function loadCompanies(url){
	console.log("initializing companies");
	request(url, function(err, response, body){
		this.companies = JSON.parse(body).companies;	
		for(var i = 0; i < 9; i++){//initial load
			if(this.displayCompanies.length < this.companies.length){
				this.displayCompanies.push(this.companies[i]);
			}
		}
		this.emitChange();
	}.bind(this));
};

CompanyStore.prototype._loadMoreCompanies = function _loadMoreCompanies(){
	console.log("updating display companies")
	var numLoaded = 0;
	for(var i = 0; i < 9; i++){ //load more upon scroll
		if(this.displayCompanies.length < this.companies.length){
			numLoaded++;
			this.displayCompanies.push(this.companies[i]);
		}
	}
	return numLoaded;
};

CompanyStore.prototype.getCompanies = function getCompanies(){
	return this.companies;
};

CompanyStore.prototype.getDisplayedCompanies = function getDisplayedCompanies(){
	return this.displayCompanies;
};

CompanyStore.prototype._onDispatch = function _onDispatch(action) {
	console.log("received dispatch");
	switch (action.type) {
		case ActionType.COMPANIES:
			this.loadCompanies(action.url);
			break;
		default:
			//dispatch not set up
	}
}

module.exports = new CompanyStore();