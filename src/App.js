import React, { useState, useEffect } from 'react'
import { Note } from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'

import './App.css'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'

export default function App () {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      noteService
        .getAll().then((data) => {
          setNotes(data)
          console.log('Data: ', { data })
          setLoading(false)
        })
    },
    1000)
  },
  [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogOut = () => {
    setUser(null)
    noteService.setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const addNote = (noteToAdd) => {
    noteService
      .create(noteToAdd)
      .then(note => {
        const newNotes = [...notes, note]
        setNotes(newNotes)
        console.log({ note })
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  return (
    <div className='app-header'>
      <h1>Notify</h1>
      <Notification message={errorMessage} />
      {user
        ? <NoteForm
            addNote={addNote}
            handleLogOut={handleLogOut}
          />
        : <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />}
      <h5>{loading ? 'Cargando...' : ''}</h5>
      <ol className='notes-list'>
        {
          notes.map((note) =>
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )
        }
      </ol>
    </div>
  )
}
