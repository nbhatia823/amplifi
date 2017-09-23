import React, { Component } from 'react';
import { render } from 'react-dom';
import Particles from 'react-particles-js';
import Input from './input.jsx';
import Button from './button.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input:"",
      listening: false,
    };
    this.receiver = new SonicReceiver();
    this.handleListeningClick = this.handleListeningClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleSendClick = this.handleSendClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.turnListenerOn();
  }

  turnListenerOn() {
    this.setState({
      listening: true
    })
    this.receiver.on('message', x => {
      console.log(`Received ${x} `);
      window.open(x, "_blank");
    });
    this.receiver.start();
  }

  turnListenerOff() {
    this.reciever.stop();
    this.setState({
      listening: false
    })
  }

  handleListeningClick() {
    if(this.state.listening === false) {
      this.turnListenerOn();
    }
    else {
      this.turnListenerOff();
    }
  }

  handleSubmitClick() {
    console.log('Submit; functionality to be implemented');
    console.log('Sending message ', this.state.input );
    this.setState({input: ""});
  
    const ssender = new SonicSender();
       ssender.send(this.state.input);
  }

  handleSendClick() {

  }

  handleInputChange(event) {
    this.setState({input: event.target.value});
    console.log('Input is:', this.state.input);
  }


  render() {
    return (
      <div>
        <div id="background"> </div>
          <h1>amplifi</h1>
        <div id="listenSection">
          <Button id="listening" text="Listening" callback={this.handleListeningClick}/>
        </div>
        <div id="separator"></div>
        <div id="sendSection">
          <Button id="sendButton" text="Send" callback={this.handleSendClick}/>
          <div className="form-group">
            <input type="text" className="form-control" id="msg" value={this.state.input} onChange={this.handleInputChange}/>
          </div>
          <Button id="submitButton" text="Submit" callback={this.handleSubmitClick}/>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('main'));
