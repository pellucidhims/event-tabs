import React,{Component} from 'react';


const tabHeaderStyle={
  minWidth: '150px',
  display:'flex',
  padding: '0px',
  justifyContent:'space-around',
  alignItems: 'baseline',
  border: 'solid 1px blue'
}


export default class TabHeader extends Component{
  constructor(props){
    super(props);
    this.state = {
      tabTile: '',
      showCloseIcon: false
    }
  }

  showCloseButton=()=>{
    this.setState({
      showCloseIcon: !this.state.showCloseIcon
    })
  }

  handleCloseTab=()=>{
    this.props.closeTab(this.props.header);
  }

  handleActiveTab=()=>{
    this.props.activateTab(this.props.header);
  }

  render(){
    const {header,active} = this.props;
    return(
      <div
        key={header.id}
        style={Object.assign({},tabHeaderStyle,{
                                                backgroundColor:`${active?'white':'blue'}`,
                                                borderRadius: `${active?'20px 20px 0px 0px':'0px 0px 0px 0px'}`,
                                                borderBottom:`${active?'solid 1px white':'solid 1px blue'}`,
                                                fontWeight: `${active?'bolder':'normal'}`,
                                                color: `${active?'black':'white'}`
                                                })}
        onMouseOver={this.showCloseButton}
        >
        <p
          style={{margin:'1px',padding:'0px'}}
          onClick={this.handleActiveTab}>{header.name}</p>
        <span
          style={{
            opacity: `${this.state.showCloseIcon?'1':'0'}`,
            fontWeight:'bolder',
            margin: '10px',
            padding: '1px'
          }}
          onClick={this.handleCloseTab}
        >
          &times;
        </span>
      </div>
    )
  }


}
