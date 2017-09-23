import React, { Component } from 'react';
import { render } from 'react-dom';
import Particles from 'react-particles-js';
import Input from './input.jsx';
import Button from './button.jsx';

class App extends Component {
  constructor() {
    super();

    this.state = {
      input:""
    };
  }

  render() {
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

            <div id="listenSection">

                <span id="listening">
                </span>

            </div>

            <div id="separator"></div>

            <div id="sendSection">
                <Button class="active" id="sendButton" text="Send"/>
                <Input class="send hidden"/>
                <Button class="send hidden" id="submitButton"/>
            </div>
        </div>

        </div>
    );
  }
}

render(<App />, document.getElementById('main'));
