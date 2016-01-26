var APIAction = require("../action/APIAction");
var AppDispatcher = require('../core/AppDispatcher');
var ActionType = require('../action/ActionType');
var request = require('request');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';
var OTHER_EVENT = '';

util.inherits(CompanyStore, EventEmitter);

function CompanyStore(){
	EventEmitter.call(this);
	this.dispatchToken = AppDispatcher.register(this._onDispatch.bind(this));
	APIAction.init();
	this.companies = [];
	this.displayCompanies = [];
	this.logos = [];
	this.setMaxListeners(0);
	this.leftOver = true;
}

CompanyStore.prototype.emitChange = function emitChange() {
	this.emit(CHANGE_EVENT);
};

CompanyStore.prototype.addChangeListener = function addChangeListener(callback){
	this.on(CHANGE_EVENT, callback);
};

CompanyStore.prototype.removeChangeListener = function removeChangeListener(callback){
	this.removeListener(CHANGE_EVENT, callback);
};

CompanyStore.prototype.loadCompanies = function loadCompanies(url){
	request(url, function(err, response, body){
		this.companies = JSON.parse(body).companies;
		for(var i = 0; i < 9; i++){//initial load
			if(this.displayCompanies.length < this.companies.length){
				this.displayCompanies.push(this.companies[i]);
				var logo_url = this.displayCompanies[i].company[0].website;
				this.loadLogo(logo_url);
			}else{
				this.leftOver = false;
				break;
			}
		}
		this.emitChange();
	}.bind(this));
};

CompanyStore.prototype.loadLogo = function loadLogo(url){
	var pass = "http://logo.clearbit.com/" + url;

	$.ajax(pass, {
		type :'GET',
        crossDomain: true
    }).done(function () {
    	this.logos.push("//logo.clearbit.com/"+url);
    }.bind(this)).fail(function () {
    }).always(function () {
        this.emitChange();
    }.bind(this));
}

CompanyStore.prototype.one = function one(){
	return 1;
}

CompanyStore.prototype._loadMoreCompanies = function _loadMoreCompanies(loaded){
	var numLoaded = 0;
	for(var i = 0; i < 9; i++){ //load more upon scroll
		if(this.displayCompanies.length < this.companies.length){
			numLoaded++;
			this.displayCompanies.push(this.companies[i + loaded]);
			this.loadLogo(this.companies[i + loaded].company[0].website);
		}
	}
	this.emitChange();
	return numLoaded;
};

CompanyStore.prototype.getCompanies = function getCompanies(){
	return this.companies;
};

CompanyStore.prototype.getDisplayedCompanies = function getDisplayedCompanies(){
	return this.displayCompanies;
};

CompanyStore.prototype.getLogos = function getLogos(){
	return this.logos;
};

CompanyStore.prototype._onDispatch = function _onDispatch(action) {
	switch (action.type) {
		case ActionType.COMPANIES:
			this.loadCompanies(action.url);
			break;
		case ActionType.LOGO:
			this.loadLogos(action.url);
			break;
		default:
			//dispatch not set up
	}
}

module.exports = new CompanyStore();