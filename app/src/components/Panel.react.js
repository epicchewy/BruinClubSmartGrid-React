var React = require('react');
var ReactDOM = require('react-dom');
var CompanyStore = require('../store/CompanyStore');
var APIAction = require ('../action/APIAction');
// var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Panel = React.createClass({
	getInitialState: function(){
		return this.getStateFromStores();
	},
	componentDidMount: function(){
		var content = ReactDOM.findDOMNode(this.refs.content);
		CompanyStore.addChangeListener(this._onChange);
		//content.addEventListener('mouseover', this._onMouseOver);
		//content.addEventListener('mouseout', this._onMouseOut);
		//store call
	},
	componentWillUnmount: function(){
		CompanyStore.removeChangeListener(this._onChange);
	},
	render: function(){
		var url = "http://" + this.state.website;
		var logoURL = this.state.logo;
		
		if(this.state.hover){
			return (
				<div className = "panel-wrapper" ref = "content">
					<div className = "panel-header">
						<h1>EYYY LMAO</h1>
					</div>
					<div className = "panel-body">
						<p className = "panel-cateogry">{this.state.category}</p>
						<a className = "panel-website" href = {url} target = "_blank">{this.state.website}</a>
					</div>
				</div>
			);
		}else{
			return (
				<div className = "panel-wrapper" ref = "content">
					<div className = "panel-header">
						<h1>{this.state.name}</h1>
					</div>
					<div className = "panel-body">
						<p className = "panel-cateogry">{this.state.category}</p>
						<a className = "panel-website" href = {url} target = "_blank">{this.state.website}</a>

						<img src ={logoURL}/> 

					</div>
				</div>
			);
		}
	},
	getStateFromStores: function(){
		// this.getLogo(this.props.company.company[0].website);
		return{
			name: this.props.company.company[0].name,
			category: this.props.company.company[0].category,
			website: this.props.company.company[0].website,
			hover: false,
			logo: this.props.logo
		}
	},
	getLogo: function(url){
	  	$.getJSON(url, handleData);
	},
	handleData: function(data){
	  this.setState({data: data});
	},
	_onChange: function(){
		this.setState(this.getStateFromStores());
	},
	_onMouseOut: function(){
		this.setState({hover:false});
	},
	_onMouseOver: function(){
		this.setState({hover:true});
	}
});

module.exports = Panel;