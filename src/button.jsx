import React from 'react';

// Button Component is a presentational component.
const Button = props => ( // Do not remove.

  /* ADD CODE HERE */
  <div>
    <button id={props.id} onClick={props.callback}>{props.text}</button>
  </div>
); // Do not remove.

export default Button;
