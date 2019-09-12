
const express = require('express');
const router = express.Router();

const Note = require('../../models/Note') // Pull in our Note model

router.get('/', function (req, res) {
  res.send('Hello, soon I will be a MERN stack app!')
});

// GET = RETRIEVE ALL NOTES

router.get('/notes', (req, res) => {
	Note.find()
	.then(notes => res.json(notes));
});

// POST = ADD A NOTE TO THE DB
// as the root of the route 'api/notes' is already defined in the server.js we dont need to have here

router.post('/', (req, res) => {
  const newNote = new Note({
  	content: req.body.content
  });
  newNote.save().then(note => res.json(note));
});

// DELETE = DELETE A NOTE FROM THE DB
// we add the property param:id

router.delete('/:id', (req, res) => {
  Note.findById(req.params.id)
  .then(item => item.remove().then(() => res.json({ success: true })))
  .catch(err => res.status(404).json({ success: false }));
});

// we cant use 'export default' in this particular file
module.exports = router;