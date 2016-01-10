var React = require('react');
var Panel = require('./Panel.react');
var TestData = require('../action/TestData');
var CompanyStore = require('../store/CompanyStore');

var PanelList = React.createClass({
	getInitialState: function(){
		return {
			data : this.props.information
		}; 
	},
	componentWillUnmount: function(){
		
	},
	render: function(){
		var panels = [];
		var companies = JSON.parse(this.state.data).companies;

		companies.forEach(function(company) {
      		if (company.company[0].name.indexOf(this.props.filterText) === -1) {
        		return;
      		}
      		

      		panels.push(<Panel company = {company} key = {company.company[0].name}></Panel>);
      		console.log("panels " + name);
    	}.bind(this));

		return (
			<div className = "panel-list">
				{panels}
			</div>
		);
	}
});

module.exports = PanelList;

// var name = company.company[0].name;
//       		var category = company.company[0].category;
//       		var website = company.company[0].website;