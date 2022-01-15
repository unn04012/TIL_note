import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import MDEditor from '@uiw/react-md-editor'
import { Link } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardTitle, CRow, CCol } from '@coreui/react'
const Note = ({ match }) => {
  const { title } = match.params
  const [note, setNote] = useState([])
  const [subPages, setSubPages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fetchNotes = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/notes/title/${title}`)
      console.log(response.data)
      setNote(response.data.message[0])
      setSubPages(response.data.subPages)
    } catch (err) {
      console.error(err)
    }
  }
  const deleteNote = async (id, e) => {
    try {
      const findNote = await axios.get(`http//`)
      const response = await axios.delete(`http://localhost:8000/notes/${id}`, {})
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }
  const useConfirm = (message = null, onConfirm, onCancel, id) => {
    if (!onConfirm || typeof onConfirm !== 'function') return
    if (onCancel && typeof onCancel !== 'function') return

    const confirmAction = (id) => {
      if (window.confirm(message)) {
        onConfirm()
        deleteNote(id)
        window.location.replace('/notes')
      } else {
        onCancel()
      }
    }

    return confirmAction
  }
  const deleteConfirm = () => alert('삭제되었습니다.')
  const cancelConfirm = () => alert('취소되었습니다.')
  const confirmDelete = useConfirm('삭제하시겠습니까?', deleteConfirm, cancelConfirm)
  useEffect(() => {
    fetchNotes()
  }, [title])

  return (
    <>
      <div className="container">
        <h1 style={{ fontSize: '40px' }}>{title}</h1>
        <CButton
          href={`/notes/${note._id}/markdown`}
          variant="outline"
          className="me-md-2"
          size="sm"
        >
          새 페이지 생성
        </CButton>
        <br />
        <br />
        <CRow>
          {subPages &&
            subPages.map((note) => (
              <CCol sm={2} key={note._id}>
                <Link to={`/notes/${note.title}`} style={{ textDecoration: 'none' }}>
                  {note.title}
                </Link>
                <br />
                <CButton
                  type="button"
                  onClick={(e) => confirmDelete(note._id, e)}
                  color="danger"
                  variant="outline"
                  size="sm"
                >
                  삭제
                </CButton>
              </CCol>
            ))}
        </CRow>
        <br />
        <MDEditor.Markdown source={note.content} />
        <br />
        <CButton href={`/notes/markdown/${title}`} role="button" variant="outline" size="sm">
          수정하기
        </CButton>
      </div>
    </>
  )
}
Note.propTypes = {
  match: PropTypes.object.isRequired,
}
export default Note
