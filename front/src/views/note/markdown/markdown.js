import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import { CForm, CFormInput } from '@coreui/react'

// import Editor from './editor'
const Markdown = () => {
  const [value, setValue] = React.useState('HEllO world')
  return (
    <>
      <CFormInput type="text" size="lg" placeholder="제목" aria-label="lg input example" />
      <br />
      <MDEditor value={value} onChange={setValue} />
      <MDEditor.Markdown source={value} />
    </>
  )
}

export default Markdown
