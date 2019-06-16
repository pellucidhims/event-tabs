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
    this.setState({
      eventTypeContents: generateContent(10),
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
      this.setState({
        eventTypeContents: generateContent(10),
        eventType: this.props.selectedEvents
      });
    }
  }

  renderEventContents = () => {
    console.log("rendering contents, array: ", this.state.eventTypeContents);
    return this.state.eventTypeContents.map((item, idx) => {
      return (
        <div>
          <div className="event-type-content-row-div" key={idx}>
            <div>{item.time.toString()}</div>
            <div>{item.content.toString()}</div>
          </div>
          <hr />
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
        <div
          className="event-content-header-main-div"
          onMouseOver={this.handleCloseIcon}
        >
          <p>
            {this.state.eventType
              ? this.state.eventType.name
              : "Loading value..."}
          </p>
          <span
            style={{
              opacity: `${this.state.showCloseIcon ? 1 : 0}`,
              cursor: "pointer",
              fontWeight: "bolder",
              padding: "5px"
            }}
            onClick={this.handleCloseTab}
          >
            &times;
          </span>
        </div>
        <div className="event-content-main-div">
          {this.state.eventTypeContents &&
          this.state.eventTypeContents.length >= 1
            ? this.renderEventContents()
            : `<div>Loading contents...</div>`}
        </div>
      </div>
    );
  }
}
