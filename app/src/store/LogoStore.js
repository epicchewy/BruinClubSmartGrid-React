var APIAction = require('../action/APIAction');
var AppDispatcher = require('../core/AppDispatcher');
var ActionType = require('../action/ActionType');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var LogoStore = function(){
	EventEmitter.call(this);
	this.dispatchToken = AppDispatcher.register(this._onDispatch.bind(this));
	this.cache = [];
	this.setMaxListeners(0);
}

util.inherits(LogoStore, EventEmitter);

LogoStore.prototype.emitChange = function emitChange() {
	this.emit(CHANGE_EVENT);
};

LogoStore.prototype.addChangeListener = function addChangeListener(callback){
	this.on(CHANGE_EVENT, callback);
};

LogoStore.prototype.removeChangeListener = function removeChangeListener(callback){
	this.removeListener(CHANGE_EVENT, callback);
};

LogoStore.prototype.getLogo = function getLogos(url){
	console.log("getting logo");
	var pass = "http://logo.clearbit.com/" + url;
	var logo_blob;
	$.ajax(pass, {
		type :'GET',
        crossDomain: true
    }).done(function (res) {
    	if(res === undefined){
    		this.cache.push("shit");
    	}else{
    		this.cache.push(res);
    	}
    }.bind(this)).fail(function () {
    }).always(function () {
        this.emitChange();
    }.bind(this));
}

LogoStore.prototype._onDispatch = function _onDispatch(action) {
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

module.exports = new LogoStore();