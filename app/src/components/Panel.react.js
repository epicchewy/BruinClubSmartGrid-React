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
		return (
			<div className = "panel-wrapper">
				<div className = "panel-header">
					<h1>{this.state.name}</h1>
				</div>
				<div className = "panel-body">
					<p className = "panel-cateogry">{this.state.category}</p>
					<a className = "panel-website">{this.state.website}</a>
				</div>
			</div>
			
		);
	},
	getStateFromStores: function(){
		return{
			name: this.props.name,
			category: this.props.category,
			website: this.props.website
		}
	}
});

module.exports = Panel;