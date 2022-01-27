import React, { useState, useEffect } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { CForm, CButton, CFormInput } from '@coreui/react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router'

// import Editor from './editor'
const Markdown = ({ match }) => {
  // const presentTitle = match.params.title
  const pageId = match.params.id
  const parentId = match.params.parentId
  console.log(pageId, parentId)
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [subPages, setSubPages] = useState('')
  const [error, setError] = useState('')
  let history = useHistory()
  const handleSubmit = async (e) => {
    // 제출 및 수정용
    e.preventDefault()

    try {
      const note = { title, content }
      let response = pageId
        ? await axios.patch(`http://localhost:8000/notes/${id}`, note) // 수정
        : await axios.post(`http://localhost:8000/notes/${parentId}`, note) // 자식 페이지 생성

      history.push(`/notes/${parentId}`)
    } catch (err) {
      setError(err)
    }
  }

  const fetchNoteById = async () => {
    try {
      if (pageId) {
        const response = await axios.get(`http://localhost:8000/notes/${pageId}`)
        setId(response.data.message[0]._id)
        setTitle(response.data.message[0].title)
        setContent(response.data.message[0].content)
        setSubPages(response.data.message)
      }
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    fetchNoteById()

    // if (pageId) {
    //   fetchNoteById()
    // }
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
          style={{ border: 'none' }}
        />
        <br />
        <MDEditor.Markdown source={content} /> <br />
        <MDEditor value={content} onChange={setContent} preview="edit" height="400" />
        <br />
        <CButton type="submit">작성</CButton>
      </CForm>
    </>
  )
}
Markdown.propTypes = {
  match: PropTypes.object.isRequired,
}

export default Markdown
