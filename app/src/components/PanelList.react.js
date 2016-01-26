var React = require('react');
var ReactDOM = require('react-dom');
var Panel = require('./Panel.react');
var TestData = require('../action/TestData');
var CompanyStore = require('../store/CompanyStore');

var PanelList = React.createClass({
	getInitialState: function(){
		return {
			data : this.props.companies,
			shouldScrollTop: true,
			loaded: 9,
			logos : CompanyStore.getLogos,
			logoCount: 9
		}; 
	},
	componentDidMount: function(){
		CompanyStore.addChangeListener(this._onChange);
		window.addEventListener('scroll', this._onScroll);
	},
	compnentWillUnmount: function(){
		CompanyStore.removeChangeListener(this._onChange);
	},
	render: function(){
		var panels = [];
		var companies = this.state.data;
		var logos = this.state.logos;
		var logoCount = this.state.logoCount;
		var loaded = this.state.loaded;
		if(logos !== undefined){
			companies.forEach(function(company) {
				var logo = "";
	      		if (company.company[0].name.indexOf(this.props.filterText) === -1) {
	        		return;
	      		}
      			for(var i = 0; i < logos.length; i++){
					if(logos[i].substring(20) == company.company[0].website){
						logo = logos[i];
					}
				}
				if(logo === ""){
					logo = "//logo.clearbit.com/ucla.edu";
				}
	      		panels.push(<Panel company = {company} key = {company.company[0].name} logo = {logo}></Panel>);
	    	}.bind(this));
		}
		
		return (
			<div ref = "content" className = "panel-list" >
				{panels}
			</div>
		);
	},
	updateCount: function(num){
		this.setState({logoCount: this.state.logoCount + num})
	},
	_onChange: function(){
		this.setState(this.getStateFromStores());
	},
	getStateFromStores: function(){
		var currentLogos = this.state.logoCount;
		return {
			logos : CompanyStore.logos,
			logoCount : CompanyStore.one
		};
	},
	_onScroll: function(){
		var height = ReactDOM.findDOMNode(this).offsetHeight;
		if($(window).scrollTop() >= height - 650){
			setTimeout(function(){
			  this._loadMoreCompanies();
			}.bind(this), 500); 
		}
	},
	_loadMoreCompanies: function(){
		var currentLoaded = this.state.loaded;
		var numLoaded = CompanyStore._loadMoreCompanies(currentLoaded);
		this.setState({
			loaded: currentLoaded + numLoaded,
			displayed: CompanyStore.getDisplayedCompanies,
			logos : CompanyStore.logos
		});
	},
});

module.exports = PanelList;