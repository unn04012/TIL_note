import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import MDEditor from '@uiw/react-md-editor'
import { CButton, CCard, CCardBody, CCardTitle, CRow, CCol, CAlert } from '@coreui/react'
import { useHistory } from 'react-router'
const Note = ({ match }) => {
  let history = useHistory()
  const { id } = match.params
  const [trash, setTrash] = useState([])
  const fetchNotes = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/trash/${id}`)
      setTrash(response.data.trash[0])
    } catch (err) {
      console.error(err)
    }
  }
  const restoreNote = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/trash/restore/${id}`)
      console.log(response.data)
    } catch (err) {
      console.error(err)
    }
  }
  const permanentDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/trash/permanent/${id}`)
      history.push('/trash')
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
        <CAlert color="danger" variant="solid">
          <div className=" col-5 mx-auto">
            이 페이지는 휴지통에 있습니다.
            <CButton
              role="button"
              variant="outline"
              size="sm"
              color="light"
              className="mx-2"
              onClick={restoreNote}
            >
              페이지 복원
            </CButton>
            <CButton
              role="button"
              variant="outline"
              size="sm"
              color="light"
              onClick={permanentDelete}
            >
              영구 삭제
            </CButton>
          </div>
        </CAlert>
        <h1 style={{ fontSize: '40px' }}>{trash.title}</h1>

        <br />
        <MDEditor.Markdown source={trash.content} />
        <br />
      </div>
    </>
  )
}
Note.propTypes = {
  match: PropTypes.object.isRequired,
}
export default Note
