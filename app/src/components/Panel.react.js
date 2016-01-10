var React = require('react');
// var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Panel = React.createClass({
	getInitialState: function(){
		return this.getStateFromStores();
	},
	componentDidMount: function(){
		//store call
	},
	componentWillUnmount: function(){
		
	},
	render: function(){
		var url = "http://" + this.state.website;
		return (
			<div className = "panel-wrapper">
				<div className = "panel-header">
					<h1>{this.state.name}</h1>
				</div>
				<div className = "panel-body">
					<p className = "panel-cateogry">{this.state.category}</p>
					<a className = "panel-website" href = {url} target = "_blank">{this.state.website}</a>
				</div>
			</div>
			
		);
	},
	getStateFromStores: function(){
		return{
			name: this.props.company.company[0].name,
			category: this.props.company.company[0].category,
			website: this.props.company.company[0].website
		}
	}
});

module.exports = Panel;