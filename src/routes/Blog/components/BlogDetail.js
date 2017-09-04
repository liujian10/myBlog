import React from 'react'
import PropTypes from 'prop-types'
import Markdown from '../../../components/Markdowm/Markdown'

class BlogDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ...props,
      detail:''
    }
  }
  componentWillMount () {
    this.props.getDetail({
      key: this.props.params.id
    })
  }
  render () {
    const { detail } = this.props
    console.log(this.props)
    const content = detail && detail.key && require('../../../../docs/' + detail.key + '.md')
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
