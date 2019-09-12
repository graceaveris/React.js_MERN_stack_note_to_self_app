const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// NOTE Schema
const NoteSchema = new Schema({
	
	content: {
		type: String,
		required: true
	},
	
	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = Note = mongoose.model('note', NoteSchema);