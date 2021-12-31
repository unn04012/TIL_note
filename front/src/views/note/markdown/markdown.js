import React, { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { CForm, CButton, CFormInput } from '@coreui/react'
import axios from 'axios'

// import Editor from './editor'
const Markdown = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const note = { title, content }
      const response = await axios.post('http://localhost:8000/notes', note)
      console.log(response)
      return response.data
    } catch (err) {
      setError(err)
    }
  }
  return (
    <>
      <CForm onSubmit={handleSubmit}>
        <CFormInput
          type="text"
          size="lg"
          placeholder="Title"
          aria-label="lg input example"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <MDEditor.Markdown source={content} />
        <MDEditor value={content} onChange={setContent} preview="edit" height="400" />
        <br />
        <CButton type="submit">제출하기</CButton>
      </CForm>
    </>
  )
}

export default Markdown
