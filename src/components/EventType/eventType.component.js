import React, { Component } from "react";

import "./eventType.css";

export default class EventType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventTypeList: []
    };
  }

  componentWillMount() {
    this.setState({
      eventTypeList: this.props.availableEventType
    });
  }

  componentWillReceiveProps() {
    this.setState({
      eventTypeList: this.props.availableEventType
    });
  }

  componentDidMount() {
    if (!this.state.eventTypeList || this.state.eventTypeList.length <= 0) {
      this.setState({
        eventTypeList: this.props.availableEventType
      });
    }
  }

  handleItemClick = item => e => {
    console.log("Clicked this item: ", item);
    this.props.onEventSelect(item);
  };

  renderEventList = eventTypes => {
    return eventTypes.map(item => {
      return (
        <div key={item.id}>
          <li onClick={this.handleItemClick(item)}>{item.name}</li>
          <hr />
        </div>
      );
    });
  };

  render() {
    const { eventTypeList } = this.state;
    return (
      <div className="event-type-div">
        <div className="event-type-header-div">
          <h1>Event Type</h1>
        </div>
        <div className="event-type-list-main-div">
          <ul className="event-list-div">
            {this.renderEventList(eventTypeList)}
          </ul>
        </div>
      </div>
    );
  }
}
