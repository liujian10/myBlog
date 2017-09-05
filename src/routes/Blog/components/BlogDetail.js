import React from 'react'
import PropTypes from 'prop-types'
import Markdown from '../../../components/Markdowm/Markdown'

class BlogDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ...props
    }
  }
  componentWillMount () {
    this.props.getDetail({
      key: this.props.params.id
    })
  }
  render () {
    const { detail } = this.props
    let content
    try {
      content = detail && detail.name && require('../../../../docs/' + detail.name + '.md')
    } catch (e) {
      console.log('Cannot find file \'../../../../docs/' + detail.name + '.md\' ')
    }
    if (content) {
      return <Markdown content={content} />
    }
    return <div>nothing</div>
  }
}

BlogDetail.propTypes = {
  getDetail: PropTypes.func,
  params: PropTypes.object,
  detail: PropTypes.object
}

export default BlogDetail
