var React = require('react');
var ReactDOM = require('react-dom');
var CompanyStore = require('../store/CompanyStore');
var LogoStore = require('../store/LogoStore');
var APIAction = require ('../action/APIAction');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Spinner = require('./Spinner.react');

var Panel = React.createClass({
	getInitialState: function(){
		return this.getStateFromStores();
	},
	componentWillMount : function(){
		this.setState({
			isLoading : true
		});
	},	
	componentDidMount: function(){
		var content = ReactDOM.findDOMNode(this.refs.content);
		CompanyStore.addChangeListener(this._onChange);
		LogoStore.addChangeListener(this._onChange);
		content.addEventListener('mouseover', this._onMouseOver);
		content.addEventListener('mouseout', this._onMouseOut);
   	},
   	componentDidUpdate: function(){
   	},
	componentWillUnmount: function(){
		CompanyStore.removeChangeListener(this._onChange);
	},
	shouldComponentUpdate: function (nextProps, nextState){
		return true;
	},
	render: function(){
		var url = "http://" + this.state.website;
		var logoURL = this.state.logo;
		
		if(this.state.hover){
			return (
				<div className = "panel-wrapper" ref = "content">
					<div className = "panel-body">
						<p className = "panel-cateogry">{this.state.category}</p>
						<a className = "panel-website" href = {url} target = "_blank">{this.state.website}</a>
					</div>
					<div className = "panel-header">
						<h1>{this.state.name}</h1>
					</div>
					
				</div>
			);
		}else{
			return (
				<div className = "panel-wrapper" ref = "content">
					<div className = "panel-body">
						<img onError = {this.handleError} src ={logoURL} /> 
					</div>
					<div className = "panel-header">
						<h1>{this.state.name}</h1>
					</div>
					
				</div>
			);
		}
	},
	getStateFromStores: function(){
		//this.getLogo(this.props.company.company[0].website);
		return{
			name: this.props.company.company[0].name,
			category: this.props.company.company[0].category,
			website: this.props.company.company[0].website,
			hover: false,
			logo: '//logo.clearbit.com/' + this.props.company.company[0].website,
			logoCheck: '//logo.clearbit.com/' + this.props.company.company[0].website,
			loading : this.props.loading,
			isLoading : true
		}
	},
	handleError : function(){
		this.setState({
			logo : "//logo.clearbit.com/ucla.edu"
		});
	},
	getLogo: function(url){
	  	var pass = "http://logo.clearbit.com/" + url;
		var logo_blob;
		$.ajax(pass, {
			type :'GET',
	        crossDomain: true
	    }).done(function (res) {
	    	var base64logo;
	    	 var reader = new window.FileReader();
			 reader.readAsArrayBufferFile(res); 
 			reader.onloadend = function() {
                base64logo = reader.result;                
  			}
	    	this.setState({
	    		logoCheck : base64logo
	    	});
	    }.bind(this)).fail(function () {
	    }).always(function () {
	    }.bind(this));
	},
	setDefault: function(){
		this.setState({
			defaultLogo : true
		});
	},
	handleData: function(data){
	  this.setState({data: data});
	},
	_onChange: function(){
		this.setState(this.getStateFromStores());
	},
	_onMouseOut: function(){
		this.setState({
			hover:false
		});
	},
	_onMouseOver: function(){
		this.setState({hover:true});
	}
});

module.exports = Panel;