import React, { Component } from "react";

import "./eventContent.css";

const generateContent = count => {
  let contentArray = [];
  for (let i = 0; i < count; i++) {
    let item = {
      time: new Date().getTime(),
      content: new Date()
    };
    contentArray.push(item);
  }
  return contentArray;
};

export default class EventContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventTypeContents: [],
      eventType: {},
      showCloseIcon: false
    };
  }
  componentWillMount() {
    console.log("this.props.selectedEvents[0].id",this.props.selectedEvents)
    this.setState({
      eventTypeContents: +this.props.selectedEvents[0].id%2===0?generateContent(5):generateContent(20),
      eventType: this.props.selectedEvents
    });
    console.log("content: ", this.state.eventTypeContents);
  }

  componentDidMount() {
    if (
      !this.state.eventTypeContents ||
      this.state.eventTypeContents.length <= 0 ||
      !this.state.eventType
    ) {
      console.log("this.props.selectedEvents[0].id",this.props.selectedEvents)
      this.setState({
        eventTypeContents: +this.props.selectedEvents[0].id%2===0?generateContent(5):generateContent(20),
        eventType: this.props.selectedEvents
      });
    }
  }

  componentWillReceiveProps(){
    console.log("this.props.selectedEvents[0].id",this.props.selectedEvents)
    this.setState({
      eventTypeContents: +this.props.selectedEvents[0].id%2===0?generateContent(5):generateContent(20),
      eventType: this.props.selectedEvents
    });
  }

  renderEventContents = () => {
    console.log("rendering contents, array: ", this.state.eventTypeContents);
    return this.state.eventTypeContents.map((item, idx) => {
      return (
        <div
          style={{backgroundColor:`${idx%2===0?'#f1f3f4':'white'}`}}
           key={idx}
        >
          <div
            className="event-type-content-row-div">
            <div>{item.time.toString()}</div>
            <div>{item.content.toString()}</div>
          </div>
        </div>
      );
    });
  };

  handleCloseIcon = () => {
    this.setState({
      showCloseIcon: !this.state.showCloseIcon
    });
  };

  handleCloseTab = () => {
    this.props.onEventClose();
  };

  render() {
    return (
      <div className="event-content-inner-main-div">
        <div className="event-content-list-div">
          {this.state.eventTypeContents &&
          this.state.eventTypeContents.length >= 1
            ? this.renderEventContents()
            : `<div>Loading contents...</div>`}
        </div>
      </div>
    );
  }
}
