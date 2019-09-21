import React from 'react';
const Note = (props) => {
 
  return (
      
    <div className='note'>
      <h2>
        {props.content}
      </h2>
     
      <div className="button-container">
        <button onClick={() => props.deleteNote()}>X</button>
        <button onClick={() => props.triggerEditBox()}>✎</button>
      </div>
    
    </div>
  )
}

export default Note;