import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Sonic from 'sonicnet';
import particleParams from './particle-params.js'

class App extends Component {
  componentDidMount() {
    this.receiver.start(this.setupListenerForListening);
    $(document).keydown((e) => {
      if(e.keyCode == 27 || e.which == 27) {
        this.exitSendMode();
      }
    });
    $('#cancel').click((e) => {
        (!$(this).hasClass('transparent')) ? this.exitSendMode() : '' ;
    });
  }

  state = {
    input: '',
    listening: false,
    sending: false,
  };
  receiver = new Sonic.Receiver();

  turnListenerOn = () => {
    if(this.state.sending === true)
      this.exitSendMode();
    this.setupListenerForListening();
    this.receiver.start();
  }

  setupListenerForListening = () => {
    this.setState({
      listening: true,
    })
    this.receiver.on('message', x => {
      console.log(`Received http:// ${x}`);
      window.open("https://is.gd/" + x, "_self");
    });
    $('#listenSection').removeClass("off").addClass("on").children('#listening').html("");
  }

  turnListenerOff = () => {
    this.receiver.stop();
    this.setState({
      listening: false
    })
    $('#listenSection').removeClass("on").addClass("off").children('#listening').html("LISTEN");
  }

  handleListeningClick = () => {
    if(this.state.listening === false)
      this.turnListenerOn();
    else
      this.turnListenerOff();
  }

  handleSendClick = () => {
    $('.hidden').removeClass('hidden').addClass('active');
    $('#sendButton').removeClass('active').addClass('hidden');
    $('#cancel').removeClass('transparent');
    $('.inputHidden').removeClass('inputHidden').addClass('inputReceive');
    this.turnListenerOff();
    this.setState({ sending: true, });
  }

  exitSendMode = () => {
    $('.active').removeClass('active').addClass('hidden');
    $('#sendButton').removeClass('hidden').addClass('active');
    $('#cancel').addClass('transparent');
    $('#sendSection').removeClass('hidden');
    $('.inputReceive').removeClass('inputReceive').addClass('inputHidden');
    this.setState({
      input: '',
      sending: false,
    });
  }

  shortenUrl = url => fetch(`/shorten_url/?url={url}`).then(res => res.text());

  handleSubmitClick = () => {
    console.log('Sending message:', this.state.input);
    this.shortenUrl(this.state.input).then(res => {
      console.log('Received from api:', res);
      const ssender = new Sonic.Sender();
      ssender.send(res.slice(14));
    });
  }

  handleInputChange = event => this.setState({input: event.target.value});

  render = () => {
    return (
        <div>
            <div id="background">
              <Particles params={particleParams}/>
            </div>

            <div id="gradient"></div>

            <div id="content">

                <h1>amplifi</h1>

                <div className="off" id="listenSection" onClick={this.handleListeningClick}>
                    <span id="listening">LISTEN</span>
                </div>

                <div id="separator"></div>

                <div className="inputHidden" id="sendSection" onClick={this.handleSendClick}>
                    <button className="active" id="sendButton">Send</button>
                    <input className="hidden"
                           id="urlInput"
                           type="text"
                           value={this.state.input}
                           onChange={this.handleInputChange}
                           placeholder="Enter your link"/>
                    <span className="hidden" id="submit" type="submit" onClick={this.handleSubmitClick}>
                      <i className="material-icons">keyboard_arrow_right</i>
                    </span>
                </div>

                <i className="material-icons transparent" id="cancel">cancel</i>

            </div>
        </div>
    );
  }
}

export default App;
