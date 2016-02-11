var React = require('react');
// var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var SearchBar = React.createClass({
	getInitialState: function(){
		 return {
		 	placeHolder : 'Search Company...',
		 	windowWidth : window.innerWidth - 260,
		 	hoverStyle: false
		 }
	},
	componentDidMount: function(){
		window.addEventListener('resize', this.handleResize);
	},
	componentDidUnmount: function(){
		//window.removeEventListener('resize', this.handleResize);
	},
	handleResize: function(){
		this.setState({
			windowWidth: window.innerWidth - 260
		});
	},
	handleChange: function() {
    	this.props.onUserInput(
     		this.refs.filterTextInput.value
    	);
  	},
	render: function(){
		appliedStyle ={
			width: this.state.windowWidth
		};

		return (
			<input
				style = {appliedStyle}
				className = "search-bar"
          		type="text"
          		placeholder={this.state.placeHolder}
          		placeholderTextColor = '#000'
          		value={this.props.filterText}
          		ref="filterTextInput"
          		onChange={this.handleChange}
        	></input>
		);
	}
});

module.exports = SearchBar;