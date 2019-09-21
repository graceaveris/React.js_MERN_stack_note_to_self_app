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
    //to hold data of selected note for editing
    noteToEdit: null,
    noteToEditContent: null,
  }

  //First load
  componentDidMount() {
  this.loadData()
  }

  //Reload data from db when required
  async loadData()  {
    await axios.get('http://localhost:5000/notes')
    .then(response => {
    const notes = response.data.reverse();
    console.log("fetched")
    this.setState({ notes: notes, dataLoaded: true, toggleEditBox: false })
   })
  }

  //ADD NOTE to the database
  async addNote(noteContent)  {
   const newNote = {
   content: noteContent
  }
  await axios.post('http://localhost:5000/', newNote)
   .then(post => console.log('item ' + post.data._id + ' has been added'))
   this.loadData()
  }

  //DELETE NOTE from the database
  async deleteNote(_id)  {
   await axios.delete('http://localhost:5000/'+_id)
   .then(post => console.log('item ' + _id + ' has been deleted'))
   this.loadData()
  }

  //Open the edit box
  triggerEditBox(_id, content) {
   this.setState({ toggleEditBox: true, noteToEdit: _id, noteToEditContent: content})
  }
  
  //UPDATE NOTE from the database
  async updateNote(_id, newNoteContent) {
   const updatedNote = {
   content: newNoteContent
  }
   await axios.patch('http://localhost:5000/'+ _id, updatedNote)
   .then(console.log('item ' + _id + ' has been updated'))
   this.loadData()
  }

  //RENDER BLOCK
  render() {

  //Rendering notes once data has loaded
  let notes;
  
  if (this.state.dataLoaded) {
    notes = 
     <div className="note-container">
       {this.state.notes.map(note => 
       <Note
        content={note.content}
        deleteNote={() => this.deleteNote(note._id)}
        triggerEditBox={() => this.triggerEditBox(note._id, note.content)}
     />)}
   </div>
  
  } else if (!this.state.dataLoaded) {
    notes = <h3>Loading</h3>
  }

  //Rendering edit box if toggleEditBox is active
  let editBox;

  if (this.state.toggleEditBox) {
    editBox = 
     <EditBox 
     content={this.state.noteToEditContent}
     _id={this.state.noteToEdit}
     updateNote={(_id, newNoteContent) => this.updateNote(_id, newNoteContent)}
    />
  }

  //RETURN BLOCK
  return (
   
    <div className="App"> 
      {editBox}
      <Form onSubmit={(noteContent) => this.addNote(noteContent)}/>
      {notes}
    </div>
   
   );
  }
}
export default App;
