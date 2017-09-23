import React from 'react';

const Input = props => {
  return (
    <input className={props.class} onChange={props.callback}/>
  )
}

export default Input;
