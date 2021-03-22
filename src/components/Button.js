import React from 'react';

export default function Button(props) {
  return (
    <div>
      <button onClick={() => props.buttonFn(props.name)}>{props.name}</button>
    </div>
  );
}
