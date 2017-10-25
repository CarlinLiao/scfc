import React, { Component } from 'react';
import ExplorerComponent from './ExplorerComponent';

class App extends Component {

  // Take our configuration as a static JSON file
  // and load it into our App as props.
  constructor(props) {
    var config = require('./configuration.json');
    super(props);
    this.state = {
      title: config.title,
      url: config.url,
      method: config.method,
      headers: config.headers,
      contentType: config.headers['Content-Type'],
      body: config.body
    }
  }

  // Create our website based on our configuration file
  // As requested, the Explorer component takes url, method, headers, contentType, and body as arguments
  render() {
    return (
      <div className="box">
        <h1>{this.state.title}</h1>
        <ExplorerComponent
          url={this.state.url}
          method={this.state.method}
          headers={this.state.headers}
          contentType={this.state.contentType}
          body={this.state.body}
        />
      </div>
    );
  }
}

export default App;
