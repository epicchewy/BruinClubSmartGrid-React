var React = require('react');
// var ReactSearchBar = require('react-search-bar');

var SearchBar = React.createClass({
	getInitialState: function(){
		 return {
		 	placeHolder : 'Search Company...'
		 }
	},
	handleChange: function() {
    	this.props.onUserInput(
     		this.refs.filterTextInput.value
    	);
  	},
	render: function(){
		return (
			<input
				className = "search-bar"
          		type="text"
          		placeholder={this.state.placeHolder}
          		value={this.props.filterText}
          		ref="filterTextInput"
          		onChange={this.handleChange}
        	></input>
		);
	}
});

module.exports = SearchBar;