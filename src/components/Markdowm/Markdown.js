import React from 'react'
import PropTypes from 'prop-types'
import './markdowm.less'

export const Markdown = ({ content }) => {
  return <article className='markdown github' dangerouslySetInnerHTML={{ __html: content }} />
}

Markdown.propTypes = {
  content: PropTypes.string
}

export default Markdown
