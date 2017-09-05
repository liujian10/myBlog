import React from 'react'
import PropTypes from 'prop-types'
import BlogSider from '../../components/Blog/BlogSider'
import { Layout, Input } from 'antd'
import './BlogLayout.less'
const { Content, Footer, Header } = Layout
const { Search } = Input

const BlogLayout = (props) => {
  const { children } = props
  return (
    <Layout className='blog-layout'>
      {BlogSider({ ...props })}
      <Layout className='blog-main' >
        <Header className='blog-main-header'>
          <Search
            placeholder='input search text'
            style={{ width: 200 }}
            onSearch={value => console.log(value)}
          />
        </Header>
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
