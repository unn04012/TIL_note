import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MarkdownComponent from 'src/components/Markdown'
axios.defaults.withCredentials = true

// import Editor from './editor'
const NoteList = () => {
  const [notes, setNotes] = useState([]) // 초기값이 중요
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/notes')
      // console.log(response.data)
      setNotes(response.data.message)
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchNotes()
  }, [])
  return (
    <>
      <div className="container">
        <MarkdownComponent name="unn04012" />
        <Link to="/notes/markdown">글쓰기</Link>

        {notes.map((note) => (
          <li key={note._id}>
            <Link to={`/notes/${note.title}`}>{note.title}</Link>
          </li>
        ))}
      </div>
    </>
  )
}

export default NoteList
