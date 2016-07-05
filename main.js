// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var $ = require("jquery");
global.jQuery = $;
require('bootstrap');
window.$ = $;
window.jQuery = $;
window.jquery = $;
window.React = React;

var ids = window.location.href.split('?');

ids = ids[1].split('&');

var fbId = ids[1].split('=')[1];
var id = ids[0].split('=')[1];
var name;

document.getElementById('profile-pic').src = "http://graph.facebook.com/"+ fbId +"/picture?type=large"

var User = Parse.Object.extend("_User");
var query = new Parse.Query(User);
query.get(id, {
  success: function(user) {
    name = user.get('realName');
    document.getElementById('user-name').innerHTML = name;
    document.getElementById('page-header').innerHTML = name.split(" ")[0] + "\'s reviews";
  },
  error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and message.
  }
});

var reviews = [];

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';

Parse.initialize("TFkqT4mJlrzRnBqFuEK06HgmYdHo6ClvT8uqLrM5", "dJv0yvlyByY4b9pfI8OJY2Cedah9fZahwWxjgC3h");

injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <MyAwesomeReactComponent data = {reviews}/>
  </MuiThemeProvider>
);

Parse.Cloud.run('getPublicReviewsIds', { id: id }).then(function(receivedIds) {
  var it = 0;
  var receivedIdsLength = Object.keys(receivedIds).length;

  for (var key in receivedIds) {
    Parse.Cloud.run('getReviewQuotes', {id: receivedIds[key]}).then(function(quotes){
      var review = {};
      review.goodQuotes = [];
      review.badQuotes = [];
      var i;
      for (i = 0; i < quotes.length; i++) {
        if(quotes[i].get("goodOrBad")) {
          var webQuote = {id: quotes[i].id, quote: quotes[i].get("quote")};
          review.goodQuotes.push(webQuote);
        } else {
          var webQuote = {id: quotes[i].id, quote: quotes[i].get("quote")};
          review.badQuotes.push(webQuote);
        }
      }
      review.name = name;
      reviews.push(review);
      it++;
    }).then(function(){
      if (it == receivedIdsLength){
        for (var key in reviews) {
          reviews[key].id = receivedIds[key];
        }
        ReactDOM.render(
          <App/>,
          document.getElementById('reviewCard')
        );
      }
    });
  }
});
