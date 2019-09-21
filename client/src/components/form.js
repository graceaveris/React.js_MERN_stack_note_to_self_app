
import React from 'react';

class Form extends React.Component {
  
  state = {
    noteToAdd: '',
  }
 
  onSubmit() {
   this.props.onSubmit(this.state.noteToAdd)
   this.setState({ noteToAdd: ''})
  } 
  
  render() {

  return (
  <div className='form'>
    <h2>Hey Grace, what's up?</h2>
      <input 
        type="text"
        className="textfield"
        value={this.state.noteToAdd}
        placeholder="Type Note to Self"
        onChange={e => this.setState({ noteToAdd: e.target.value})}  
      />
          
      <div> 
        <button
          className="main-btn"
          onClick={() => this.onSubmit()}>Add Note to Self
        </button>
      </div>
      
    </div>

    );
   }
  }

export default Form;


