import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Avatar, Popover, Icon } from 'antd'
import QueueAnim from 'rc-queue-anim'
import './Sider.less'

const { SubMenu } = Menu
const BlogSider = (props) => {
  const { blog } = props
  const { menus = [], userInfo = {} } = blog
  const { nickName, gender, mobile, email, headPic } = userInfo
  const handleClick = ({ item, key }) => {
    props.routerPush('/blog/detail/' + key)
    props.getDetail({
      name: item.props.name,
      key: key
    })
  }
  const getMenuItem = (data) => {
    let res
    if (data.key) {
      if (data.children) {
        res = <SubMenu
          key={data.key}
          title={<span>
            <Icon type='bars' />
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
          <Icon type='book' />
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
    <QueueAnim type={['left', 'right']} ease={['easeOutQuart', 'easeInOutQuart']}>
      {props.collapsed ? null : [
        <div
          key='sider-logo'
          className={props.collapsed ? 'blog-logo-normal' : 'blog-logo-collapsed'}
          style={{ background:props.logoBackground }}>
          <Popover
            title={userTitle}
            placement={props.collapsed ? 'rightTop' : 'bottom'}
            content={userContent}
          >
            <Avatar src={headPicImg} style={{ background:props.logoBackground }} />
            <span className='blog-log-text' >{nickName}</span>
          </Popover>
        </div>,
        <Menu
          key='sider-menu'
          // collapsible
          defaultSelectedKeys={[blog.currentKey]}
          selectedKeys={[blog.currentKey]}
          onClick={handleClick}
          mode='inline'
          style={{ height:'100%' }}
        >
          {
            menus && menus.map && menus.map(item => {
              return getMenuItem(item)
            })
          }
        </Menu>
      ]}
    </QueueAnim>
  )
}

BlogSider.propTypes = {
  blog: PropTypes.object,
  collapsed: PropTypes.bool,
  routerPush: PropTypes.func,
  getDetail: PropTypes.func,
  logoBackground: PropTypes.string
}

export default BlogSider
