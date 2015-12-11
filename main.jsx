'use strict';

const React = require('react');
const Request = require('request');
const ReactDOM = require('react-dom');
const VideoList = require('./VideoList.jsx')

const TedApp = React.createClass({
  getInitialState: function() {
    //creates an array to store all the rss feed video information
    return {
      videos: [],
    };
  },

  componentDidMount: function() {
    //On component mount we make a request to the server to get the JSON object and set it in state
    Request('https://agile-thicket-5774.herokuapp.com/feed', (error, response, body) => {
      if (error) {
        console.error("Something went wrong with getting the : ", error);
        return;
      } 
      body = JSON.parse(body);
      this.setState({videos: body.items})
    })
  },

  render: function() {
    //render the whole application including the video list and the navbar
    return (
      <div>
        <div className="NavBar">
          <h1 id="title">TED Videos</h1>
        </div>
        <VideoList videos={this.state.videos} />
      </div>
    );
  }
});

//Adds the react element to the DOM
ReactDOM.render(<TedApp />, document.getElementById('container'));