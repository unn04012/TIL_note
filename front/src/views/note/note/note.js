import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import MDEditor from '@uiw/react-md-editor'
import { Link } from 'react-router-dom'
const Note = ({ match }) => {
  const { title } = match.params
  const [note, setNote] = useState([])
  const fetchNotes = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/notes/title/${title}`)
      // console.log(response.data)
      setNote(response.data.message[0])
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    fetchNotes()
  }, [])
  return (
    <>
      <div className="container">
        <h1 style={{ fontSize: '40px' }}>{title}</h1>
        <br />
        <MDEditor.Markdown source={note.content} />
        <Link className="btn btn-primary" to={`/notes/markdown/${title}`} role="button">
          수정하기
        </Link>
      </div>
    </>
  )
}
Note.propTypes = {
  match: PropTypes.object.isRequired,
}
export default Note
