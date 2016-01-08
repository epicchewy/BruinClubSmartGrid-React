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
		//another store call <LoginView></LoginView>
	},
	render: function(){
		var panels = [];
		var companies = JSON.parse(this.state.data).companies;
		for(var i = 0; i < 2; i++){
			var name = companies[i].company[0].name;
			var website = companies[i].company[0].website;
			var category = companies[i].company[0].category;
			panels.push(<Panel name={name} category={category} website={website}></Panel>);
		}
		return (
			<div className = "panel-list">
				{panels}
			</div>
		);
	}
});

module.exports = PanelList;