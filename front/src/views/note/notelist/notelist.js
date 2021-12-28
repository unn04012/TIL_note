import React, { useEffect, useState } from 'react'
import { CButton, CLink } from '@coreui/react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MarkdownComponent from 'src/components/Markdown'
axios.defaults.withCredentials = true
const fetchData = async () => {
  try {
    const result = await axios.get('http://localhost:8000/notes', {})
    console.log(result)
  } catch (err) {
    console.log(err)
  }
}
// import Editor from './editor'
const Note = () => {
  const [data, setData] = useState('')

  //fetchData()
  return (
    <>
      <div className="container">
        <MarkdownComponent name="unn04012" />
        <button onClick={fetchData}>alert</button>
        <Link to="/note/markdown">글쓰기</Link>
        <CButton component="a" color="primary" href="/note/markdown" role="button">
          글쓰기
        </CButton>
      </div>
    </>
  )
}

export default Note
