import React, { Component } from "react";
import EventType from "../EventType/eventType.component";
import EventContent from "../EventContent/eventContent.component";
import TabHeader from '../TabHeader/tabHeader.component';

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


function reassignTab(tabList,replaceTabId){
  console.log("reassigning, tablist: ",tabList);
  if(tabList.length >1){
    for(let i=0;i<tabList.length;i++){
      if(tabList[i].id==replaceTabId){
         if(tabList[i+1] !== undefined){
           return tabList[i+1].id
         }else{
           return tabList[i-1].id;
         }
      }
    }
  }
  return ''
}

export default class EventsViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvents: [],
      selectedTabHeaders: [],
      currentActiveTab: ''
    };
  }


  handleEventSelect = e => {
    //let currSelected = [...this.state.selectedEvents];
    let currSelectedTabHeaders = [...this.state.selectedTabHeaders];
    //let pushToSelected = true;
    let pushToSelectedTabHeaders = true;
    // for (let item of currSelected) {
    //   if (item.id === e.id && item.name === e.name) {
    //     pushToSelected = false;
    //     break;
    //   }
    // }
    for (let item of currSelectedTabHeaders) {
      if (item.id === e.id && item.name === e.name) {
        pushToSelectedTabHeaders = false;
        break;
      }
    }
    // if (pushToSelected) {
    //   currSelected.push(e);
    //   this.setState({
    //     selectedEvents: currSelected
    //   });
    // }
    if (pushToSelectedTabHeaders) {
      currSelectedTabHeaders.push(e);
      this.setState({
        selectedTabHeaders: currSelectedTabHeaders,
        currentActiveTab: e.id
      });
    }else{
      this.setState({
        currentActiveTab: e.id
      });
    }

  };

  handleEventClose = e => {
    // console.log("Closing item :", boundItem);
    // let newSelectedItems = this.state.selectedEvents.filter(
    //   item => item.id !== boundItem.id
    // );
    // this.setState({
    //   selectedEvents: newSelectedItems
    // });

  };

  handleTabClose=(e)=>{
    let reassignCurrentTab = '';

    let keepTabsOpenList = this.state.selectedTabHeaders.filter((item,idx)=>{
          if(item.id!==this.state.currentActiveTab && item.id!==e.id){
            return item;
          }else if(item.id===this.state.currentActiveTab && item.id===e.id){
            reassignCurrentTab = reassignTab(this.state.selectedTabHeaders,e.id);
          }else if(item.id!==e.id && item.id===this.state.currentActiveTab){
            return item;
          }
    });
    this.setState({
      selectedTabHeaders: keepTabsOpenList,
      currentActiveTab: reassignCurrentTab.trim()!==''?reassignCurrentTab:this.state.currentActiveTab
    });
  }

  handleTabActivation=(e)=>{
    this.setState({
      currentActiveTab: e.id
    })
  }

  renderTabHeader=()=>{
    return this.state.selectedTabHeaders.map((header,idx)=>{
      return(
        <TabHeader
          header={header}
          closeTab={this.handleTabClose}
          activateTab={this.handleTabActivation}
          key={header.id}
          active={this.state.currentActiveTab === header.id? true: (!this.state.currentActiveTab && idx===this.state.selectedTabHeaders.length-1?true:false)}
        />
      )
    })
  }

  renderEventContentTabs = (tabId) => {
      console.log("render tab id: ",tabId);
      console.log("selectedTabHeaders: ",this.state.selectedTabHeaders);
      let renderItem = this.state.selectedTabHeaders.filter(item=>item.id==tabId);
      if(renderItem.length > 0) {
        return (
              <div>
              <div style={{paddingLeft: '10px'}}>
                <h3> {`Current tab - ${renderItem[0].name}`}</h3>
              </div>
              <EventContent
                selectedEvents={renderItem}
                onEventClose={this.handleEventClose(renderItem)}
                key={renderItem.id}
              />
              </div>
        );
      }else{
        return '';
      }
  };

  render() {
    console.log('render called with state: ',this.state)
    return (
      <div className="main-div">
        <div className="main-app-div">
          <div className="event-type-main-div">
            <EventType
              availableEventType={availableEvents}
              onEventSelect={this.handleEventSelect}
            />
          </div>
          <div className="event-content-main-div">
            <div className="event-content-header-tabs-div">
              {this.renderTabHeader()}
            </div>
            <div className="event-content-sec-div">
              {this.state.currentActiveTab? this.renderEventContentTabs(this.state.currentActiveTab):''}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
