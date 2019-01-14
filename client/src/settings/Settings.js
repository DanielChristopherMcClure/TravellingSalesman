import React, {Component} from 'react';
import Modal from 'react-modal';
import Config from '../Config';
var FontAwesome = require('react-fontawesome');

const filterModalStyle = {
  content : {
    top : '50%',
    left : '50%',
    right : 'auto',
    bottom : 'auto',
    marginRight : '-50%',
    transform : 'translate(-50%, -50%)',
    width: '500px',
    maxWidth: '100vw',
    overflow: "none"
  }
};

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      host: "",
      port: ""
    }
    this.openSettings = this.openSettings.bind(this);
    this.closeSettings = this.closeSettings.bind(this);
    this.updateServer = this.updateServer.bind(this);
    this.updateHost = this.updateHost.bind(this);
    this.updatePort = this.updatePort.bind(this);
    this.renderSettings = this.renderSettings.bind(this);
  }

  componentWillMount() {
    let hostPort = global.serverHost.split(":");
    this.setState({host:hostPort[0],port:hostPort[1]});
  }

  openSettings() {
    this.setState({open: true});
  }

  closeSettings() {
    this.updateServer(this.state.host, this.state.port);
    new Config().config(this.props.updateConfig);
    this.setState({open: false});
  }

  updateServer(host, port) {
    global.serverHost = host+":"+port;
  }

  updateHost(e) {
    this.setState({host:e.target.value});
  }

  updatePort(e) {
    this.setState({port:e.target.value});
  }

  renderSettings() {
    return(<div className="col-12 px-0">
      <div className="col-12 px-0">
        <div className="col-12">Host Name:</div>
        <div className="col-12">
        <input type="text" className="Select-control"
          onChange={this.updateHost} value={this.state.host}/></div>
      </div>
      <div className="col-12 px-0">
        <div className="col-12">Port Number:</div>
        <div className="col-12">
        <input type="text" className="Select-control"
          onChange={this.updatePort} value={this.state.port}/></div>
      </div></div>);
  }

  render() {
    return (
      <div className="col-12 card" style={{borderRadius:0,borderTop:0,borderColor:"#aaa",padding:0}}>
        <div className="card-body col-12" style={{padding:0}}>
        <button className="btn btn-csu btn-csu-icons"
          title="Change server the client connects to." onClick={this.openSettings}>
          <FontAwesome name='server'/> Change Server</button>
        <Modal
          style={filterModalStyle}
          isOpen={this.state.open}
          ariaHideApp={false}
        >
          <div className="row">
            <button className="btn btn-csu btn-csu-icons col-12" onClick={this.closeSettings}>
              <FontAwesome name='check-square'/> Done</button>
            {this.renderSettings()}
          </div>
        </Modal>
        </div>
      </div>
    )
  }
}

export default Settings;
