import { useState, useEffect } from 'react'
import { Note } from './components/Note'
import {getAllNotes} from './services/notes/getAllNotes'
import {createNote} from './services/notes/createNote'

import './App.css';

export default function App() {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      getAllNotes().then((data) => {
        setNotes(data)
        setLoading(false)
    })},
    1000)
  },
  [])
  
  const handleChange = (e) =>{
    setNewNote(e.target.value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    const noteToAdd = {
      title: newNote,
      body: newNote,
      userId: 1
    }

    createNote(noteToAdd)
      .then(note => {
        setNotes([...notes, note])
        setNewNote("")
      })
  }
  return (
    <div className="App-header">
      <h1>Notify</h1>
      <h5>{loading?'Cargando...':''}</h5>
      <ol className='notes-list'>
        {notes
        .map((note) => <Note key={note.id} {...note} />)}
      </ol>
      <form className='notes-form' onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote}/>
        <button>Create Note</button>
      </form>
    </div>
  );
}
