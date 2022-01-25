import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import { CRow, CCol, CButton } from '@coreui/react'
import { Link } from 'react-router-dom'

const TrashList = () => {
  const [trashes, setTrashes] = useState([])
  const history = useHistory()
  const showTrashes = async () => {
    const response = await axios.get('http://localhost:8000/trash')
    setTrashes(response.data.trashList)
  }
  const restoreAll = async () => {
    const response = await axios.post('http://localhost:8000/trash/restore')
    history.push('/notes')
  }
  useEffect(() => {
    showTrashes()
  }, [])
  return (
    <>
      <div className="container">
        <h1>휴지통</h1>
        <div className="container">
          <CRow>
            {trashes.map((trash) => (
              <CCol sm={2} key={trash._id}>
                <Link to={`/trash/${trash._id}`} style={{ textDecoration: 'none', width: '100px' }}>
                  {trash.title}
                </Link>
              </CCol>
            ))}
          </CRow>
          <br />
          <CButton variant="outline" className="me-md-2" color="danger" onClick={restoreAll}>
            전체복원
          </CButton>
        </div>
      </div>
    </>
  )
}

export default TrashList
