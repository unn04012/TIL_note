import React, { useState, useEffect } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { CForm, CButton, CFormInput } from '@coreui/react'
import axios from 'axios'
import PropTypes from 'prop-types'

// import Editor from './editor'
const Markdown = ({ match }) => {
  const presentTitle = match.params.title
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const handleSubmit = async (e) => {
    // 제출 및 수정용
    e.preventDefault()
    try {
      const note = { title, content }
      let response = ''
      if (id) {
        response = await axios.patch(`http://localhost:8000/notes/${id}`, note)
      } else {
        response = await axios.post('http://localhost:8000/notes', note)
      }

      return response.data
    } catch (err) {
      setError(err)
    }
  }
  const fetchNoteByTitle = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/notes/title/${presentTitle}`)
      setId(response.data.message[0]._id)
      setTitle(response.data.message[0].title)
      setContent(response.data.message[0].content)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    if (presentTitle) {
      fetchNoteByTitle()
    }
  }, [])
  return (
    <>
      <CForm onSubmit={handleSubmit}>
        <CFormInput
          type="text"
          size="lg"
          placeholder="Title"
          aria-label="lg input example"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <MDEditor.Markdown source={content} /> <br />
        <MDEditor value={content} onChange={setContent} preview="edit" height="400" />
        <br />
        {presentTitle !== undefined ? (
          <CButton type="submit">수정하기</CButton>
        ) : (
          <CButton type="submit">제출하기</CButton>
        )}
      </CForm>
    </>
  )
}
Markdown.propTypes = {
  match: PropTypes.object.isRequired,
}

export default Markdown
