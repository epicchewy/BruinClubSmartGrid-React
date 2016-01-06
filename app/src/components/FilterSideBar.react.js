var React = require('react');

var FilterSideBar = React.createClass({
	getInitialState: function(){
		 return {
		 	placeHolder : 'Search Company or Filter...'
		 }
	},
	componentWillMount: function(){

	},
	componentDidMount: function(){
		//store call
	},
	componentWillUnmount: function(){
		//another store call <LoginView></LoginView>
	},
	render: function(){
		return (
			<div className = "filterbar-wrapper">
				<div className = "filterbar-content">
				</div>
			</div>

		);
	}
});

module.exports = FilterSideBar;