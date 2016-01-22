var React = require('react');
var CompanyStore = require('../store/CompanyStore');
var SearchBar = require('./SearchBar.react');
var Panel = require('./Panel.react');
var FilterSideBar = require('./FilterSideBar.react');
var PanelList = require('./PanelList.react');
var request = require('request');

var App = React.createClass({
	getInitialState: function(){
		return this._getStateFromStores();	
	},
	componentWillMount: function(){
		CompanyStore.addChangeListener(this._onChange);
	},
	componentDidMount: function() {	
		CompanyStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function(){
		CompanyStore.removeChangeListener(this_onChange);
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
				<div className = "panels">
					<PanelList companies = {this.state.displayed} filterText={this.state.filterText} />
				</div>
			</div>
		);
	},
	_getStateFromStores: function(){
		console.log("getting state");
		return {
			displayed: CompanyStore.displayCompanies,
			logged: false,
			filterText: '',
			companies: CompanyStore.companies
		};
	},
	_onChange: function(){
		this.setState(this._getStateFromStores());
	}
});

module.exports = App;