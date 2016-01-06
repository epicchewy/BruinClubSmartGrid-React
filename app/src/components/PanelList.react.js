var React = require('react');
var Panel = require('./Panel.react');
var TestData = require('../action/TestData');
var PanelList = React.createClass({
	getInitialState: function(){
		return {
			data : TestData
		}; 
	},
	componentWillMount: function(){
		
	},
	componentDidMount: function(){
		//store call
	},
	componentWillUnmount: function(){
		//another store call <LoginView></LoginView>
	},
	render: function(){
		var panels = [];
		var data = this.state.data;
		console.log("data : " + JSON.stringify(data.one));

		for(var information in data){
			panels.push(<Panel name={data[information].name} value={data[information].value} description={data[information].description}></Panel>);
		}
		// for(var i = 0; i < 9; i++){
		// 	var props = this.state.data[i];
		// 	panels.push(<Panel name={props.name} value={props.value} description={props.description}></Panel>);
		// }
		return (
			<div className = "panel-list">
				{panels}
			</div>
		);
	}
});

module.exports = PanelList;