import React, { Component } from "react";
import EventType from "../EventType/eventType.component";
import EventContent from "../EventContent/eventContent.component";

import "./eventsViewer.css";

const availableEvents = [
  { name: "Events Type 1", id: "1" },
  { name: "Events Type 2", id: "2" },
  { name: "Events Type 3", id: "3" },
  { name: "Events Type 4", id: "4" },
  { name: "Events Type 5", id: "5" },
  { name: "Events Type 6", id: "6" },
  { name: "Events Type 7", id: "7" },
  { name: "Events Type 8", id: "8" },
  { name: "Events Type 9", id: "9" },
  { name: "Events Type 10", id: "10" },
  { name: "Events Type 11", id: "11" },
  { name: "Events Type 12", id: "12" },
  { name: "Events Type 13", id: "13" },
  { name: "Events Type 14", id: "14" },
  { name: "Events Type 15", id: "15" },
  { name: "Events Type 16", id: "16" },
  { name: "Events Type 17", id: "17" },
  { name: "Events Type 18", id: "18" },
  { name: "Events Type 19", id: "19" },
  { name: "Events Type 20", id: "20" },
  { name: "Events Type 21", id: "21" },
  { name: "Events Type 22", id: "22" },
  { name: "Events Type 23", id: "23" },
  { name: "Events Type 24", id: "24" },
  { name: "Events Type 25", id: "25" },
  { name: "Events Type 26", id: "26" }
];

export default class EventsViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvents: []
    };
  }

  handleEventSelect = e => {
    let currSelected = [...this.state.selectedEvents];
    let pushToSelected = true;
    for (let item of currSelected) {
      if (item.id === e.id && item.name === e.name) {
        pushToSelected = false;
        break;
      }
    }
    if (pushToSelected) {
      currSelected.push(e);
      this.setState({
        selectedEvents: currSelected
      });
    }
  };

  handleEventClose = boundItem => e => {
    console.log("Closing item :", boundItem);
    let newSelectedItems = this.state.selectedEvents.filter(
      item => item.id !== boundItem.id
    );
    this.setState({
      selectedEvents: newSelectedItems
    });
  };

  renderEventContentTabs = () => {
    console.log("rendering event tabs: ", this.state.selectedEvents);
    return this.state.selectedEvents.map(item => {
      return (
        <EventContent
          selectedEvents={item}
          onEventClose={this.handleEventClose(item)}
          key={item.id}
        />
      );
    });
  };

  render() {
    return (
      <div className="main-app-div">
        <div className="event-type-main-div">
          <EventType
            availableEventType={availableEvents}
            onEventSelect={this.handleEventSelect}
          />
        </div>
        <div className="event-content-main-div">
          <div className="event-content-sec-div">
            {this.renderEventContentTabs()}
          </div>
        </div>
      </div>
    );
  }
}
