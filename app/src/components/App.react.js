var React = require('react');
var SearchBar = require('./SearchBar.react');
var Panel = require('./Panel.react');
var FilterSideBar = require('./FilterSideBar.react');
var PanelList = require('./PanelList.react');
var APIAction = require('../action/APIAction');
var CompanyStore = require('../store/CompanyStore');
var request = require('request');

var App = React.createClass({
	getInitialState: function(){
		return {
			data: {},
			logged: false
		}
	},
	componentWillMount: function(){
		var url = "http://bruinclub.herokuapp.com/api/companies";
		request(url, function(err, response, body){
			if(this.isMounted()){
				this.setState({
		        	data : body,
		        	logged: true
		     	});
			}
		}.bind(this));	
	},
	render: function(){
		var companies = this.state.data;
		if(!this.state.logged){
			return(
				<div className = "root">
					<SearchBar></SearchBar>
					<div className = "loading-bar">Loading...</div>
				</div>
			);
		}else{
			return(
				<div className = "root">
					<SearchBar></SearchBar>
					<FilterSideBar></FilterSideBar>
					<div className = "panels">
						<PanelList information = {companies}></PanelList>
					</div>
				</div>
			);
		}
		//make header chatroomarea and chatroom list <GroupChatList></GroupChatList>company_array = {companies}
	},
	getStateFromStores: function(){
		return {
			login: true,
			data: {}
		}
	}
});

module.exports = App;

