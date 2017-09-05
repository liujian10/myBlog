import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Avatar, Popover, Icon } from 'antd'
import './BlogSider.less'

const { Sider } = Layout
const { SubMenu } = Menu
const BlogSider = (props) => {
  const { blog } = props
  const { menus = [], userInfo = {} } = blog
  const { nickName, gender, mobile, email, headPic } = userInfo
  const handleClick = ({ item, key }) => {
    props.routerPush('/blog/' + key)
    props.getDetail({
      name: item.props.name,
      key: key
    })
  }
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
  const getMenuItem = (data) => {
    let res
    if (data.key) {
      if (data.children) {
        res = <SubMenu
          key={data.key}
          title={<span>
            <span>{data.name || data.desc}</span>
          </span>}>
          {
            data.children.map(function (child) {
              return getMenuItem(child)
            })
          }
        </SubMenu>
      } else {
        res = <Menu.Item {...data} >
          <span>{data.name || data.desc} </span>
        </Menu.Item>
      }
    }
    return res
  }
  const userContent = (
    <div>
      <p>手机：<a href={'tel:' + mobile}>{mobile}</a></p>
      <p>邮箱：<a href={'mailto:' + email}>{email}</a></p>
    </div>
  )
  const userTitle = (
    <div>
      {nickName}
      <Icon type={gender ? 'man' : 'woman'} style={{ marginLeft:'5px' }} />
    </div>
  )

  const headPicImg = headPic && require('../../static/images/' + headPic)
  return (
    <Sider
      className='blog-layout-sider'
      // collapsible
      collapsed={props.collapsed}
      onCollapse={props.onCollapse}
      style={getSiderStyle(props.collapsed)}
    >
      <Popover
        title={userTitle}
        placement='bottom'
        content={userContent}
      >
        <div
          className={props.collapsed ? 'blog-logo-normal' : 'blog-logo-collapsed'}
          style={{ background:props.logoBackground }}>
          <Avatar src={headPicImg} style={{ background:props.logoBackground }} />
          <span> {nickName}</span>
        </div>
      </Popover>
      <Menu
        defaultSelectedKeys={[blog.currentKey]}
        selectedKeys={[blog.currentKey]}
        onClick={handleClick}
        mode='inline'
        style={{ height:'100%' }}
      >
        {
          menus && menus.map && menus.map(function (item) {
            return getMenuItem(item)
          })
        }
      </Menu>
    </Sider>
  )
}

BlogSider.propTypes = {
  blog: PropTypes.object,
  collapsed: PropTypes.bool,
  onCollapse: PropTypes.func,
  routerPush: PropTypes.func,
  getDetail: PropTypes.func,
  logoBackground: PropTypes.string
}

export default BlogSider
