import React from 'react'
import PropTypes from 'prop-types'
import BlogSider from '../../components/Blog/BlogSider'
import { Layout } from 'antd'
import './BlogLayout.less'
const { Content, Footer } = Layout

const BlogLayout = (props) => {
  const { children } = props
  return (
    <Layout className='blog-layout'>
      {BlogSider({ ...props })}
      <Layout className='blog-main' >
        <Content className='blog-main-content' >
          {children}
        </Content>
        <Footer className='blog-main-footer' >
          Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

BlogLayout.propTypes = {
  children: PropTypes.element
}

export default BlogLayout
