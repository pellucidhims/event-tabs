import React from "react";
import ReactDOM from "react-dom";
import EventsViewer from "./components/EventsViewer/eventsViewer.component";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <EventsViewer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
