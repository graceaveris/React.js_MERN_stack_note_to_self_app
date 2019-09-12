import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Note from './components/note.js';
import Form from './components/form.js';
import EditBox from './components/editBox.js';


class App extends Component {

  state = {
    notes: [],
   
    dataLoaded: false,
    
    toggleEditBox: false,
    noteToEdit: null,
    noteToEditContent: null
  }


//CDM which triggers first load
 componentDidMount() {
  this.loadData()
 }


//funciton for re-loading data when require
async loadData()  {
   await axios.get('http://localhost:5000/notes')
  .then(response => {
    const notes = response.data.reverse();
    this.setState({ notes: notes, dataLoaded: true})
    })
  .catch((error) => {
  })
 }


//we add a new note to the database
async addNote(noteContent)  {
  const newNote = {
  content: noteContent
  }
 await axios.post('http://localhost:5000/', newNote)
 .then(post => console.log('item ' + post.data._id + ' has been added'))
 this.loadData()
}


//we delete a post from the database
async deleteNote(_id)  {
  await axios.delete('http://localhost:5000/'+_id)
 .then(post => console.log('item ' + _id + ' has been deleted'))
 this.loadData()
}


triggerEditBox(_id, content) {
  this.setState({ toggleEditBox: true, noteToEdit: _id, noteToEditContent: content})
}


async updateNote(_id, newNoteContent) {
  const updatedNote = {
    content: newNoteContent
  }
 await axios.patch(('http://localhost:5000/'+ _id), updatedNote)
}


 render() {

  let notes;
  
  if (this.state.dataLoaded) {
    notes = (
   <div>
   
    {this.state.notes.map(note => 
    <Note
      content={note.content}
      deleteNote={() => this.deleteNote(note._id)}
      triggerEditBox={() => this.triggerEditBox(note._id, note.content)}
    />)}

   </div>)
  } else if (!this.state.dataLoaded) {
    notes = <p>Loading</p>
  }


//editbox screen trigger
  let editBox;

  if (this.state.toggleEditBox) {
    editBox = <EditBox 
    content={this.state.noteToEditContent}
    updateNote={(_id, newNoteContent) => this.updateNote(this.state.noteToEdit, 'balls')}/>
  }

  return (
    <div className="App">
      
      <Form onSubmit={(noteContent) => this.addNote(noteContent)}/>
      <div className='note-container'>{notes}</div>
      {editBox}
    
    </div>
   );
  }

}
export default App;
