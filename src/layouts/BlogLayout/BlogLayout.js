import React from 'react'
import PropTypes from 'prop-types'
import BlogSider from '../../components/Blog/Sider'
import BlogHeader from '../../components/Blog/Header'
import { Layout, BackTop } from 'antd'
import './BlogLayout.less'
const { Content, Footer, Sider } = Layout

const BlogLayout = (props) => {
  const { children, collapsed, onCollapse } = props
  const getTarget = () => document.getElementsByClassName('blog-main')[0] || window
  const getSiderStyle = (collapsed) => {
    return collapsed ? {
      background : '#fff',
      height:'100%'
    } : {
      background : '#fff',
      height:'100%',
      overflowY:'auto',
      overflowX:'hidden',
      paddingBottom: '50px'
    }
  }
  return (
    <Layout className='blog-layout'>
      <Sider
        className='blog-layout-sider'
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={getSiderStyle(collapsed)}
      >
        <BlogSider {...props} />
      </Sider>
      <Layout className='blog-main' >
        <BlogHeader {...props} />
        <Content className='blog-main-content'>
          {children}
        </Content>
        <Footer className='blog-main-footer' >
          Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>
      <BackTop target={getTarget} />
    </Layout>
  )
}

BlogLayout.propTypes = {
  children: PropTypes.element,
  onCollapse: PropTypes.func,
  collapsed: PropTypes.bool
}

export default BlogLayout
