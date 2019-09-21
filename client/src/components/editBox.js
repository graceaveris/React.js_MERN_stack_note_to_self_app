import React from 'react';

class EditBox extends React.Component {
  
  state = {
  	content: this.props.content,
  }

render() {
  return (
  
  <div className="edit-form-background">
    <div className="edit-form">
        
      <label> Update Note: </label><br />
        <input 
          type="text"
          className="textfield"
          value={this.state.content}
          onChange={ e => this.setState({ content: e.target.value})} 
        /><br />
            
        <button
          onClick={() => this.props.updateNote(this.props._id, this.state.content)}>Update
        </button>
    
      </div>
    </div>

   );
  }
}

export default EditBox;
