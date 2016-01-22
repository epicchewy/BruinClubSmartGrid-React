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
			loaded: 9
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
		companies.forEach(function(company) {
      		if (company.company[0].name.indexOf(this.props.filterText) === -1) {
        		return;
      		}
      		panels.push(<Panel company = {company} key = {company.company[0].name} ></Panel>);
    	}.bind(this));

		return (
			<div ref = "content" className = "panel-list" onScroll = {this._onScroll}>
				{panels}
			</div>
		);
	},
	_onChange: function(){
		console.log("panel-list changed");
	},
	_onScroll: function(){
		var height = ReactDOM.findDOMNode(this).offsetHeight;
		if($(window).scrollTop() >= height -650){
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
			displayed: CompanyStore.getDisplayedCompanies
		});
	},
});

module.exports = PanelList;