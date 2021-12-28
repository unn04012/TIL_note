import React from 'react'
import MDEditor from '@uiw/react-md-editor'
// import Editor from './editor'
const Markdown = () => {
  const [value, setValue] = React.useState('HEllO world')
  return (
    <>
      <div className="container">
        <MDEditor value={value} onChange={setValue} />
        <MDEditor.Markdown source={value} />
      </div>
    </>
  )
}

export default Markdown