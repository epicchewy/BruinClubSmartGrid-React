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
		console.log("state" + JSON.stringify(this.state));
		return (
			<div className = "panel-wrapper">
				<div className = "panel-header">
					<h1>{this.state.name}</h1>
				</div>
				<div className = "panel-body">
					<p>{this.state.description}</p>
				</div>
			</div>
			
		);
	},
	getStateFromStores: function(){
		return{
			name: this.props.name,
			value: this.props.value,
			description: this.props.description
		}
	}
});

module.exports = Panel;