import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CCardTitle,
  CCardText,
  CCardBody,
  CCard,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
axios.defaults.withCredentials = true

// import Editor from './editor'
const NoteList = () => {
  const [notes, setNotes] = useState([]) // 초기값이 중요
  const [search, setSearch] = useState('') // 초기값이 중요
  const [searchResult, setSearchResult] = useState([])
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
  const searchTotal = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(`http://localhost:8000/notes/search/?search=${search}`)
      setSearchResult(response.data.message)
      if (searchResult.length) console.log(searchResult)
    } catch (err) {
      setError(err)
    }
  }
  useEffect(() => {
    fetchNotes()
  }, [])
  return (
    <>
      <h1>HOME</h1>
      <CCol sm={3}>
        <CForm>
          <CIcon icon={cilSearch} size="lg" style={{ cursor: 'pointer' }}></CIcon>
          <CFormInput
            className="form-control"
            id="ex2"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></CFormInput>
          <CButton type="submit" size="sm" onClick={searchTotal}>
            검색
          </CButton>
        </CForm>
      </CCol>
      {searchResult.length >= 1 && (
        <CRow>
          {searchResult.map((result) => (
            <CCol sm={5} key={result._id}>
              <CCard style={{ width: '18rem' }}>
                <CCardBody>
                  <CCardTitle>
                    <Link to={`/notes/${result.title}`}>{result.title}</Link>
                  </CCardTitle>
                  <CCardText>{result.content}</CCardText>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
      )}
      <div className="container">
        <CRow>
          {notes.map((note) => (
            <CCol sm={2} key={note._id}>
              <Link to={`/notes/${note.title}`} style={{ textDecoration: 'none', width: '100px' }}>
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
        <CButton href="/notes/markdown" variant="outline" className="me-md-2">
          글쓰기
        </CButton>
      </div>
    </>
  )
}

export default NoteList
