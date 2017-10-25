import React, { Component } from 'react';

// A reactive component for each Body element that changes the requirements of the
// input field based on what type it is, (email, text, or tel).
//
// Note that the regex pattern parser assumes that the input is of the correct form.
class BodyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Properties given by the parent component.
      name: props.body.name,
      type: props.body.type,
      min: props.body.min,
      max: props.body.max,
      placeholder: props.body.placeholder,
      pattern: props.body.pattern,

      // Changes on edits to the input field of this component.
      input: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  } // end of BodyForm constructor
  
  // On input change, change this component's own state and pass the change back to the parent component.
  handleInputChange(event) {
    this.setState({input: event.target.value});
    this.props.onChange(this.state.name, event.target.value);
  }

  render() {
    // Attributes in input aren't bassed if the component doesn't have them thanks to React,
    // (e.g. if this is a text input, the max=, min=, pattern=, and title= properties aren't
    //  set because those state field are undefined.)
    return (
      <div>
        <label htmlFor={this.state.name}>{this.state.name}</label>
        <input 
          type={this.state.type}
          id={this.state.name}
          name={this.state.name}
          value={this.state.value}
          placeholder={this.state.placeholder}
          max={this.state.max}
          min={this.state.min}
          pattern={this.state.pattern}
          title={this.state.pattern}
          onChange={this.handleInputChange}
        /><br />
      </div>
    );
  } // end of render()
} // end of BodyFrom class definition
    
export default BodyForm;