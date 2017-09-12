import React from 'react'
import PropTypes from 'prop-types'
import BlogSider from '../../components/Blog/Sider'
import { Layout, Input, BackTop, Affix, Icon } from 'antd'
import './BlogLayout.less'
const { Content, Footer, Header, Sider } = Layout
const { Search } = Input

const BlogLayout = (props) => {
  const { children, collapsed, onCollapse } = props
  const getTarget = () => document.getElementsByClassName('blog-main')[0] || window
  const changeCollapsed = () => props.onCollapse(!collapsed)
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
        // collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={getSiderStyle(collapsed)}
      >
        <BlogSider {...props} />
      </Sider>
      <Layout className='blog-main' >
        <Affix target={getTarget}>
          <Header className='blog-main-header'>
            <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'}
              style={{ fontSize: 16, marginRight:20 }}
              onClick={changeCollapsed} />
            <Search
              placeholder='input search text'
              style={{ width: 200 }}
              onSearch={value => console.log(value)}
            />
          </Header>
        </Affix>
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
