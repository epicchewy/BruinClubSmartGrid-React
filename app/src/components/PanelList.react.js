var React = require('react');
var ReactDOM = require('react-dom');
var Panel = require('./Panel.react');
var TestData = require('../action/TestData');
var CompanyStore = require('../store/CompanyStore');
var LogoStore = require('../store/LogoStore');
var immutable = require('immutable');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group'); 

var PanelList = React.createClass({
	getInitialState: function(){
		return {
			data : this.props.companies,
			shouldScrollTop: true,
			loaded: 9,
			logos : CompanyStore.getLogos,
			logoCount: 9,
			completeCompanyList : CompanyStore.companies,
			loadingGifUrl : 'http://www.cuisson.co.uk/templates/cuisson/supersize/slideshow/img/progress.BAK-FOURTH.gif',
			initLoad : false
		}; 
	},
	componentDidMount: function(){
		LogoStore.addChangeListener(this._onChange);
		window.addEventListener('scroll', this._onScroll);
		window.addEventListener('resize', this.handleResize);
		var widthList = ReactDOM.findDOMNode(this).offsetWidth;
		this.setState({
			widthList : widthList
		});
	},
	compnentWillUnmount: function(){
		LogoStore.removeChangeListener(this._onChange);
	},
	handleResize: function(){
		var widthList = ReactDOM.findDOMNode(this).offsetWidth;
		this.setState({
			widthList : widthList
		});
	},
	shouldComponentUpdate: function (nextProps, nextState){
		if(this.state.loading){
			this.setState({
				loading: false
			});
		}
		return true;
	},
	render: function(){
		var panels = [];
		var companies = this.state.data;
		var logos = this.state.logos;
		var logoCount = this.state.logoCount;
		var loaded = this.state.loaded;

		var widthList = this.state.widthList;
		var panelPerRow;

		var displayCompanies = [];
		var displayPanels = [];
		if(companies.length !== 0){
			var loadingStyle = {
				backgroundImage :'url(' + this.state.loadingGifUrl + ')',
				height : 200,
				width : 200
			};
			if(logos !== undefined){
				companies.forEach(function(company) {
					var logo = "";

		      		if (company.company[0].name.indexOf(this.props.filterText) === -1 ) {
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
					// console.log(company.company[0].website);
		      		displayPanels.push(<Panel company = {company} key = {company.company[0].name} logo = {logo} website = {company.company[0].website} loading = {this.state.loading}></Panel>);
		    	}.bind(this));
			}
			return (
				<div className = "panel-list" >
					{displayPanels}
				</div>
			);
		}else{
			return ( <div>Loading...</div>
				);
		}
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
			this._loadMoreCompanies();
			this.setState({
				loading: true
			})
		}
	}, //"A man's gotta set standards, and not let the standards set the man." - Shaun Siyuan Liu 2/1/2016 12:51AM
	_loadMoreCompanies: function(){
		var currentLoaded = this.state.loaded;
		var numLoaded = CompanyStore._loadMoreCompanies(currentLoaded);
		this.setState({
			initLoad : true,
			loaded: currentLoaded + numLoaded,
			displayed: CompanyStore.getDisplayedCompanies,
			logos : CompanyStore.logos
		});
	},
});

module.exports = PanelList;
