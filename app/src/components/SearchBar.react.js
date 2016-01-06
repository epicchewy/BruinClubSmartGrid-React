var React = require('react');
var ReactSearchBar = require('react-search-bar');

var SearchBar = React.createClass({
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
			<div className = "search-bar-container">
				<ReactSearchBar placeholder = {this.state.placeHolder} onChange={this.onChange} onSearch={this.onSearch} onSubmit = {this.onSubmit}></ReactSearchBar>
			</div>

		);
	},
	onChange: function(input, resolve) {
	    setTimeout(() => {
	     	const suggestions = matches[Object.keys(matches).find((partial) => {
	        	return input.match(new RegExp(partial), 'i');
	      	})] || ['one', 'two', 'three'];

	      	resolve(suggestions.filter((suggestion) =>
	        	suggestion.match(new RegExp('^' + input.replace(/\W\s/g, ''), 'i'))
	      	));
	    }, 25);
  	},
  	onSearch: function(input) {
  		console.log("searching");
  	},
  	onSubmit: function(input) {
  		console.log("submitted");
  	}
});

module.exports = SearchBar;
