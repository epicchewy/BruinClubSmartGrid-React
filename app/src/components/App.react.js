var React = require('react');
var CompanyStore = require('../store/CompanyStore');
var SearchBar = require('./SearchBar.react');
var Panel = require('./Panel.react');
var FilterSideBar = require('./FilterSideBar.react');
var PanelList = require('./PanelList.react');
var request = require('request');

function getStateFromStores() {
	console.log("getting state");
	return {
		displayed: CompanyStore.displayCompanies,
		logged: false,
		filterText: '',
		loaded: 9,
		companies: CompanyStore.companies
	};
}

var App = React.createClass({
	getInitialState: function(){
		return getStateFromStores();	
	},

	componentDidMount: function() {		
		this._setScroll();
	},
	componentWillUpdate: function() {
		this._checkScroll();
	},
	componentDidUpdate: function() {
		this._setScroll();
	},
	handleUserInput: function(filterText) {
    	this.setState({
      		filterText: filterText
    	});
  	},
	render: function(){
		var companies = this.state.companies;
		console.log("companies : " + JSON.stringify(this.state.displayed));
		return(
			<div>
				<SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput}></SearchBar>
				<FilterSideBar></FilterSideBar>
				<div className = "panels">
					<PanelList companies = {this.state.displayed} filterText={this.state.filterText} />
				</div>
			</div>
		);
	},
	_setScroll: function(){
		console.log("updated");
	},
	_checkScroll: function(){
		// console.log("checking scroll");
	},
	_onScroll: function(){
		this._loadMoreCompanies();
	},
	_loadMoreCompanies: function(){
		var numLoaded = CompanyStore._loadMoreCompanies();
		var currentLoaded = this.state.loaded;
		this.setState({
			loaded: currentLoaded + numLoaded,
			displayed: CompanyStore.getDisplayedCompanies
		});

	}
});

module.exports = App;

	// componentWillMount: function(){
	// 	this._checkScroll();
	// 	var url = "http://bruinclub.herokuapp.com/api/companies";
	// 	request(url, function(err, response, body){
	// 		if(this.isMounted()){
	// 			this.setState({
	// 	        	data : JSON.parse(body).companies,
	// 	        	logged: true,
	// 	        	loaded: 0
	// 	     	});
	// 	     	this._loadMoreCompanies();
	// 		}
	// 	}.bind(this));	
	// }, 

		// if(!this.state.logged){
		// 	return(
		// 		<div>
		// 			<SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput}></SearchBar>
		// 			<FilterSideBar></FilterSideBar>
		// 			<div className = "loading-bar">Loading...</div>
		// 		</div>
		// 	);
		// }else{
