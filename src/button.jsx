import React from 'react';

// Button Component is a presentational component.
const Button = props => ( // Do not remove.

  /* ADD CODE HERE */
    <button id={props.id} className={props.className} onClick={props.callback}>{props.text}</button>
); // Do not remove.

export default Button;
