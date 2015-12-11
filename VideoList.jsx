'use strict';

const React = require('react');
const moment = require('moment');


//Component to hold all the cards
const VideoList = React.createClass({
   getInitialState: function() {
    //sets up an initial empty state for cards that have been selected
    return {
      selected: {},
    };
  },
  toggleSelected: function(index, video){
    //this function toggles a card between selected and non-selected states
    const tempSelected = this.state.selected
    console.log(tempSelected)
    //check every element in the state
    for (let key in tempSelected) {
      //if the value already exists, delete it from state, to set it as closed
      if(key === index + video.title){
          delete tempSelected[key];
          this.setState({selected: tempSelected});
          return;
      }
    };
    //if the value isn't in the selected object then add it to the selected object
    tempSelected[index + video.title] = true;
    this.setState({selected: tempSelected});
  },

  render: function() {

    //this creates the individual cards to add to the videolist
    let createItem = function(video, index) {
      let item;
      const split = video.title.split(' | ')
      const title = split[0];
      const speaker = split[1];
      const pubDate = moment(Date.parse(video.pubDate)).fromNow();

      //A simple if statement to determine if a value should be selected or not
      if (this.state.selected[index + video.title] === true) {
        //detailed view
        item =  
          <div className="card"> 
            <div onClick={() => {this.toggleSelected(index, video)}}>
              <i className="material-icons up-arrow">keyboard_arrow_up</i> 
              <h3>{title}</h3>
            </div>
            <h4> {speaker} </h4>
            <p> Posted {pubDate}</p>
            <p> {video['itunes:summary']}</p>
            <div>
              <a href={video['feedburner:origLink']}> Watch the Video on TED</a>
            </div>
            <div className='video'>
              <video src={video['feedburner:origEnclosureLink']} controls type="video/mp4" />
            </div>
          </div>;
      } 
      else {
        //simple view
        item = 
          <div className="card closedCard" onClick={() => {this.toggleSelected(index, video)}} >
            <i className="material-icons down-arrow">keyboard_arrow_down</i>
            <h3>{title}</h3>
            <h4>{speaker}</h4>
            <p> Posted {pubDate}</p>
          </div>;
      }

      return <div className="col-1-4" key={index + video.title}>
              {item}
              </div>;
      
    };
    //Render a div with all the card elements inside of it
    return <div className="clearfix"> {this.props.videos.map(createItem.bind(this))}</div>;
  }
});


module.exports = VideoList;