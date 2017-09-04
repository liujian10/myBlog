import React from 'react'
import PropTypes from 'prop-types'
import BlogLayout from '../../../layouts/BlogLayout'
import { Spin } from 'antd'

class Blog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: true,
      currentKey:'1',
      logoBackground:'#fff'
    }
  }
  componentWillMount () {
    this.props.getUserInfo()
    this.props.getMenus({}, ({ menus }) => {
      if (Array.isArray(menus) && menus.length) {
        let path = this.props.getIndexPath()
        path && this.props.router.replace(path)
      }
    })
  }
  onCollapse = collapsed => {
    this.setState({ collapsed })
  }
  routerPush = path => {
    this.props.router.push(path)
  }
  render () {
    let params = {
      ...this.props,
      ...this.state,
      routerPush:this.routerPush,
      onCollapse:this.onCollapse
    }
    if (this.props.children && this.props.blog) {
      return <BlogLayout {...params} >{this.props.children}</BlogLayout>
    }
    return (<Spin size='large' />)
  }
}

Blog.propTypes = {
  getUserInfo: PropTypes.func,
  getMenus: PropTypes.func,
  getIndexPath: PropTypes.func,
  children: PropTypes.element,
  menus: PropTypes.array,
  router: PropTypes.object.isRequired,
  blog:PropTypes.object.isRequired
}

export default Blog
