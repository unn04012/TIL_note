import React from 'react'
import PropTypes from 'prop-types'

function Markdown(props) {
  return <div>{props.name}님 안녕하세요</div>
}
Markdown.propTypes = {
  name: PropTypes.string.isRequired,
}
export default Markdown
