
import React from 'react';

class Form extends React.Component {
  
  state = {
    noteToAdd: ''
  }
  
  render() {

  return (
  <div className='form'>
     <h2>Hey Grace, what's up?</h2>
          <input 
            type="text"
            className="textfield"
            placeholder="Type note to self"
            onChange={e => this.setState({ noteToAdd: e.target.value})}  />
          
        <div> 
           <button 
             onClick={() => this.props.onSubmit(this.state.noteToAdd)}>Add Post-it
           </button>
        </div>
    </div>

    );
   }
  }

export default Form;


