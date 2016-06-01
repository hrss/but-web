// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
var $ = require("jquery");
global.jQuery = $;
require('bootstrap');
window.$ = $;
window.jQuery = $;
window.jquery = $;

var ids = window.location.href.split('?');

var fbId = ids[1];
var id = ids[0];

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';

Parse.initialize("TFkqT4mJlrzRnBqFuEK06HgmYdHo6ClvT8uqLrM5", "dJv0yvlyByY4b9pfI8OJY2Cedah9fZahwWxjgC3h");

injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <MyAwesomeReactComponent />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('reviewCard')
);
