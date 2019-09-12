import React from 'react';
const Note = (props) => {
 
  return (
      
      <div className='note'>
      <h2>
        {props.content}
      </h2>

      <p onClick={() => props.deleteNote(props._id)}>X</p>
      <p> edit note</p>
     </div>
  )
}

export default Note;