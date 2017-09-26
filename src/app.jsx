import React, { Component } from 'react';
import { render } from 'react-dom';
import Particles from 'react-particles-js';
import Sonic from 'sonicnet';

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

  handleSubmitClick = () => {
    console.log('Sending message ', this.state.input );
    $.get('/url', {url: this.state.input}, data => {
      console.log('Received from api:', data);
      const ssender = new Sonic.Sender();
      ssender.send(data.slice(14));
    } );
  }

  handleInputChange = (event) => {
    this.setState({input: event.target.value});
    console.log('Input is:', this.state.input);
  }

  render = () => {
    return (
        <div>
            <div id="background">
            <Particles params={{
              "particles": {
                "number": {
                  "value": 135,
                  "density": {
                    "enable": false,
                    "value_area": 1603.40724038582
                  }
                },
                "color": {
                  "value": "#ffffff"
                },
                "shape": {
                  "type": "triangle",
                  "stroke": {
                    "width": 0,
                    "color": "#000000"
                  },
                  "polygon": {
                    "nb_sides": 3
                  },
                  "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                  }
                },
                "opacity": {
                  "value": 0.6974821495678316,
                  "random": true,
                  "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                  }
                },
                "size": {
                  "value": 3.945745992601726,
                  "random": true,
                  "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                  }
                },
                "line_linked": {
                  "enable": true,
                  "distance": 205.17879161528975,
                  "color": "#fff",
                  "opacity": 0.14204685573366216,
                  "width": 1
                },
                "move": {
                  "enable": true,
                  "speed": 1.60340724038582,
                  "direction": "none",
                  "random": true,
                  "straight": false,
                  "out_mode": "out",
                  "bounce": false,
                  "attract": {
                    "enable": false,
                    "rotateX": 1122.385068270074,
                    "rotateY": 1200
                  }
                }
              },
              "interactivity": {
                "detect_on": "canvas",
                "events": {
                  "onhover": {
                    "enable": false,
                    "mode": "repulse"
                  },
                  "onclick": {
                    "enable": false,
                    "mode": "push"
                  },
                  "resize": true
                },
                "modes": {
                  "grab": {
                    "distance": 400,
                    "line_linked": {
                      "opacity": 1
                    }
                  },
                  "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                  },
                  "repulse": {
                    "distance": 200,
                    "duration": 0.4
                  },
                  "push": {
                    "particles_nb": 4
                  },
                  "remove": {
                    "particles_nb": 2
                  }
                }
              },
              "retina_detect": true
            }}/>

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

render(<App />, document.getElementById('main'));
