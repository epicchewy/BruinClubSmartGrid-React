var React = require('react');
var SearchBar = require('./SearchBar.react');
var Panel = require('./Panel.react');
var FilterSideBar = require('./FilterSideBar.react');
var PanelList = require('./PanelList.react');

var App = React.createClass({
	getInitialState: function(){
		return this.getStateFromStores();
	},
	componentDidMount: function(){
		//store call
	},
	componentWillUnmount: function(){
		//another store call <LoginView></LoginView>
	},
	render: function(){
		console.log("bruin club intialized");
		return (
			<div className = "root">
				<h1>Smart Grid</h1>
				<SearchBar></SearchBar>
				<FilterSideBar></FilterSideBar>
				<div className = "panels">
					<PanelList></PanelList>
				</div>
			</div>
		);
			//make header chatroomarea and chatroom list <GroupChatList></GroupChatList>
	},
	getStateFromStores: function(){
		return {
			login: true
		}
	}
});

module.exports = App;

