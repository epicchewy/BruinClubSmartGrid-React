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
	render: function(){
		var companies;
		if(this.state.searched.length > 0){
			companies = this.state.searched;
		}else{
			companies = this.state.displayed;
		}

		var root_style = {
			overflowY : "hidden"
		};

		return(
			<div style ={root_style}>
				<SearchBar filterText={this.state.filterText} onUserInput={this._filterText}></SearchBar>
				<div className = "panels">
					<PanelList companies = {companies} logos = {this.state.logos}/>
				</div>
			</div>
		);
	},
	_getStateFromStores: function(){
		return {
			displayed: CompanyStore.displayCompanies,
			logged: false,
			companies: CompanyStore.companies,
			logos: CompanyStore.logos,
			searched : []
		};
	},
	_filterText: function(text){
		var updatedList = this.state.companies;
	    updatedList = updatedList.filter(function(item){
	      	return item.company[0].name.toLowerCase().search(text.toLowerCase()) !== -1;
	    });
	    this.setState({searched: updatedList});
	},
	_onChange: function(){
		this.setState(this._getStateFromStores());
	}
});

module.exports = App;