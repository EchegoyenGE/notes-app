import React, { useRef, useState } from 'react'
import Togglable from './Togglable.js'

export default function NoteForm ({ addNote, handleLogOut }) {
  const [newNote, setNewNote] = useState('')
  const togglableRef = useRef()

  const handleChange = (e) => {
    setNewNote(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const noteToAdd = {
      content: newNote,
      important: true
    }

    addNote(noteToAdd)
    setNewNote('')
    togglableRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel='Show Create Note' ref={togglableRef}>
      <h3>Create a new note</h3>
      <form className='notes-form' onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          placeholder='New Note'
          value={newNote}
        />
        <button>Save</button>
      </form>
      <div>
        <button onClick={handleLogOut}>
          Cerrar sesión
        </button>
      </div>
    </Togglable>
  )
}
