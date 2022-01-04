import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { CButton, CCard, CCardBody, CCardTitle, CRow, CCol, CCardText } from '@coreui/react'
axios.defaults.withCredentials = true

// import Editor from './editor'
const NoteList = () => {
  const [notes, setNotes] = useState([]) // 초기값이 중요
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const history = useHistory()
  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/notes')
      setNotes(response.data.message)
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }
  const deleteNote = async (id, e) => {
    try {
      const response = await axios.delete(`http://localhost:8000/notes/${id}`)
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
  }, [])
  return (
    <>
      <h1>Notes</h1>
      <div className="container">
        <CRow>
          {notes.map((note) => (
            <CCol sm={2} key={note._id}>
              <CCard>
                <CCardBody>
                  <CCardTitle>
                    <Link to={`/notes/${note.title}`} style={{ textDecoration: 'none' }}>
                      {note.title}
                    </Link>
                  </CCardTitle>

                  <CButton
                    type="button"
                    onClick={(e) => confirmDelete(note._id, e)}
                    color="danger"
                    variant="outline"
                    size="sm"
                  >
                    삭제
                  </CButton>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
        <br />
        <CButton href="/notes/markdown" variant="outline" className="me-md-2">
          글쓰기
        </CButton>
      </div>
    </>
  )
}

export default NoteList
