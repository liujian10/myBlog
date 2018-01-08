import React from 'react';
import PropTypes from 'prop-types';
import './markdowm.less';
import ReactMarkDown from 'react-markdown';

export const Markdown = ({ content }) => {
  return <ReactMarkDown className='markdown github' source={content}/>;
};

Markdown.propTypes = {
  content: PropTypes.string
};
