import React from 'react';

class EditBox extends React.Component {
  
  state = {

  	content: this.props.content,

  }

 
render() {
  return (
  
  <div>
        
        <label> Update Title: </label><br />
          <input 
            type="text"
            className="textfield"
            value={this.state.content}
            onChange={ e => this.setState({ content: e.target.value})} /> <br />
            <button
            onClick={() => this.props.updateNote()}>OK</button>
    </div>

    );
  }
}

export default EditBox;
