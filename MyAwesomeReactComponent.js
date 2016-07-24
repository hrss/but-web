import React from 'react';
import Card from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';
import Parse from 'parse';

var Carousel = require('nuka-carousel');

Parse.initialize("TFkqT4mJlrzRnBqFuEK06HgmYdHo6ClvT8uqLrM5", "dJv0yvlyByY4b9pfI8OJY2Cedah9fZahwWxjgC3h");

    var Decorators = [{
      component: React.createClass({
        render() {
          return (
            <button
              style={this.getButtonStyles(this.props.currentSlide === 0)}
              onClick={this.handleClick}><img src="images/ic_navigate_before_black_24dp_1x.png"/>
            </button>
          )
        },
        handleClick(e) {
          e.preventDefault();
          this.props.previousSlide();
        },
        getButtonStyles(disabled) {
          return {
            border: 0,
            background: 'none',
            color: 'white',
            padding: 10,
            outline: 0,
            opacity: disabled ? 0.3 : 1,
            cursor: 'pointer'
          }
        }
      }),
      position: 'CenterLeft'
    },
    {
      component: React.createClass({
        render() {
          return (
            <button
              style={this.getButtonStyles(this.props.currentSlide + this.props.slidesToScroll >= this.props.slideCount)}
              onClick={this.handleClick}><img src="images/ic_navigate_next_black_24dp_1x.png"/>
            </button>
          )
        },
        handleClick(e) {
          e.preventDefault();
          this.props.nextSlide();
        },
        getButtonStyles(disabled) {
          return {
            border: 0,
            background: 'none',
            color: 'white',
            padding: 10,
            outline: 0,
            opacity: disabled ? 0.3 : 1,
            cursor: 'pointer'
          }
        }
      }),
      position: 'CenterRight'
    },
    {
      component: React.createClass({
        render() {
          var self = this;
          var indexes = this.getIndexes(self.props.slideCount, self.props.slidesToScroll);
          return (
            <ul style={self.getListStyles()}>
              {
                indexes.map(function(index) {
                  return (
                    <li style={self.getListItemStyles()} key={index}>
                      <button
                        style={self.getButtonStyles(self.props.currentSlide === index)}
                        onClick={self.props.goToSlide.bind(null, index)}>
                        &bull;
                      </button>
                    </li>
                  )
                })
              }
            </ul>
          )
        },
        getIndexes(count, inc) {
          var arr = [];
          for (var i = 0; i < count; i += inc) {
            arr.push(i);
          }
          return arr;
        },
        getListStyles() {
          return {
            position: 'relative',
            margin: 0,
            display: 'none',
            top: -10,
            padding: 0
          }
        },
        getListItemStyles() {
          return {
            listStyleType: 'none',
            display: 'none'
          }
        },
        getButtonStyles(active) {
          return {
            border: 0,
            background: 'transparent',
            color: 'black',
            cursor: 'pointer',
            padding: 10,
            outline: 0,
            fontSize: 24,
            opacity: active ? 1 : 0.5
          }
        }
      }),
      position: 'BottomCenter'
    }
];

var quoteStyle = {
  textAlign: 'center',
  margin: 'auto',
  maxWidth: '80%'
};

var QuoteText = React.createClass({
  render: function () {
    return (
      <p style={quoteStyle}>{this.props.quote}</p>
    );
  }
});

const ButCard = React.createClass({
  render: function() {

    var cardStyle = {
      backgroundColor: '#fefefe'
    };
    return (
    <Card style={cardStyle}>
      <CardHeader title={this.props.title}></CardHeader>
      <CardText>
        <div>
          <SimpleSlider goodQuotes = {this.props.goodQuotes} badQuotes = {this.props.badQuotes}/>
        </div>
      </CardText>
    </Card>
    );
  }
});

var CardsList = React.createClass({
  render: function() {
    var ulStyle = {
      listStyleType: 'none' // 'ms' is the only lowercase vendor prefix
    };
    var cards = this.props.data.map(function(review) {
      var liStyle = {
        marginTop: '25px'
      };
      return (
        <li key={review.id} style = {liStyle}>
          <ButCard  title = {review.name} badQuotes={review.badQuotes} goodQuotes={review.goodQuotes}/>
        </li>
      );
    });
    return (
      <ul style={ulStyle}>
        {cards}
      </ul>
    );
  }
});

var QuotesList = React.createClass({
  render: function() {
    var quotes = this.props.data.map(function(incomingQuote) {
      return (
        <QuoteText key = {incomingQuote.id} quote = {incomingQuote.quote}/>
      );
    });
    return (
      <Carousel decorators = {Decorators}>
        {quotes}
      </Carousel>
    );
  }
});

var SimpleSlider = React.createClass({
  render: function () {
    return (
      <div>
          <QuotesList data = {this.props.badQuotes} />
        <div>
          <p>But</p>
        </div>
          <QuotesList data = {this.props.goodQuotes} />
      </div>
    );
  }
});


const MyAwesomeReactComponent = React.createClass ({
  render: function() {
    return(
      <CardsList data = {this.props.data}/>
    );
  }
});


export default MyAwesomeReactComponent;
