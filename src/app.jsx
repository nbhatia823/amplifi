import React, { Component } from 'react';
import { render } from 'react-dom';
import AceEditor from 'react-ace';

class App extends Component {
  constructor() {
    super();

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <AceEditor />
      </div>
    );
  }
}

render(<App />, document.getElementById('main'));
