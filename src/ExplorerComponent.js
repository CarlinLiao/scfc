import React, { Component } from 'react';
import BodyForm from './BodyForm';

/** ExplorerComponent takes each of the fields of the configuration json
    (except the title, which is rendered in App.ja) and returns an HTML
    div describing the static header and url as well as the mutable body
    properties (each of type email, text, and tel) of the API endpoint
    configuration.
    
    Changes to the body property input fields are registered and can be
    submitted by clicking the "Send Request" button which constructs a
    fetch request based on the configuration and the given inputs and
    returns the result in the textarea at the end of this component.

    NOTE: currently, email/tel pattern enforcement is client-side.
*/
class ExplorerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Properties given by the parent component.
      // This information will go into the fetch request.
      url: props.url,
      method: props.method,
      headers: props.headers,
      contentType: props.contentType,
      body: props.body,

      /*  ## CONTENTS OF EACH body ARRAY ELEMENT ##
          name: required on component creation
          type: required on component creation
          min:  on component creation IFF type is 'email'
          max:  on component creation IFF type is 'email'
          placeholder:  on creation IFF type is 'text'
          pattern:      on creation IFF type is 'tel'
          input:        created by BodyForm component and passed back to ExplorerComponent 
       */

      // Populates/changes on each fetch request submission.
      response: ''
    }
    this.handleAnInputChange = this.handleAnInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  } // end of ExplorerComponent constructor
  
  // When any of our body inputs change, update our state.
  handleAnInputChange(bodyKeyName, newBodyInput) {
    this.setState({body: this.state.body.map(
      // Find the element in the body array that has the same name as the changing element,
      // and mutate that one. Return a modified copy of the entire array to the setState call.
      (el) => el.name === bodyKeyName ? Object.assign({}, el, {input: newBodyInput}) : el 
    )});
  }
  
  // When the user hits the 'Send request' button,
  // change state to update response textarea.
  onSubmit(event) {
    // Build the init array to pass to the fetch request.
    var init = {
      method: this.state.method,
      headers: this.state.headers,
      body: new FormData()
    };

    // Build body of fetch request from our props as a FormData object.
    // Note: assumed that the API only needed the name of the input 
    // and the input itself and not additional info like the pattern, e.g.
    //    {
    //      'full-name': 'Carlin Liao', 
    //      'email': 'carlin.liao@berkeley.edu',
    //      'tel': '851-2928'
    //    }
    for (var i=0; i<this.state.body.length; i++) {
      init.body.append(this.state.body[i].name, this.state.body[i].input);
    }

    // Make the fetch request, cast the result (or error) as a string,
    // and update the state in response.
    fetch(this.state.url, init)
      .then(function(resp) {
        if (!resp.ok) {
          return resp.status + " error";
        } else {
          return JSON.stringify(resp.json());
        }
      })
      .then(str => this.setState({response: str}));
    event.preventDefault();
  } // end of handleSubmit() definition

  // Iterate through the header elements, placing them as text in <p> components
  // and return them in a list
  renderHeaders() {
    var headerPs = []
    for (var key in this.state.headers) {
      headerPs.push(<p>{key+": "+this.state.headers[key]}</p>);
    }
    return headerPs;
  }

  // Iterate through the list of body items, creating BodyForm components for each
  // of them and return them in a list
  renderBody() {
    var bodyDivs = [];
    for (var i=0; i<this.state.body.length; i++) {
      bodyDivs.push(
        <BodyForm 
          body={this.state.body[i]}
          onChange={this.handleAnInputChange}
        />
      );
    } // end of loop through body objects
    return bodyDivs;
  } // end of renderBody() definition

  // Render the ExplorerComponent
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <p>{this.state.method}</p>
        <h2>Headers</h2>
        <div className="code">{this.renderHeaders()}</div>
        <h2>Base URL</h2>
        <p className="code">{this.state.url}</p>
        <h2>Body</h2>
        <div className="fields">{this.renderBody()}</div>
        <input type="submit" value="Send Request" />
        <h2>Response</h2>
        <textarea disabled value={this.state.response}></textarea>
      </form>
    );
  } // end of render()
} // end of ExplorerComponent class definition

export default ExplorerComponent;
