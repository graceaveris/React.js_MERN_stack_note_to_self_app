import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Note from './components/note.js';
import Form from './components/form.js';


class App extends Component {

  state = {
    notes: [],
    dataLoaded: false
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

async updateNote(_id) {
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
    />)}

   </div>)
  } else if (!this.state.dataLoaded) {
    notes = <p>Loading</p>
  }


  return (
    <div className="App">
      
      <Form onSubmit={(noteContent) => this.addNote(noteContent)}/>
      <div className='note-container'>{notes}</div>
    
    </div>
   );
  }

}
export default App;
