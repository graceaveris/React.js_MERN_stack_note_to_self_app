import React from 'react';
const Note = (props) => {
 
  return (
      
      <div className='note'>
      <p>
        {props.content}
      </p>

      <p onClick={() => props.deleteNote()}>X</p>
      <p onClick={() => props.triggerEditBox()}>Edit</p>
     </div>
  )
}

export default Note;