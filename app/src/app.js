var App = require('./components/App.react');
var React = require('react');
var ReactDOM = require('react-dom');
var CompanyStore = require('./store/CompanyStore');
var APIAction = require('./action/APIAction');

ReactDOM.render(
	<App />,
	document.getElementById('root')
);