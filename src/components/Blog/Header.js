import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Affix, Icon, Select } from 'antd'
import './Header.less'
const { Header } = Layout
const { Option, OptGroup } = Select

const BlogHeader = (props) => {
  const { blog, collapsed } = props
  const { menus = [], menuItems = [] } = blog
  const getTarget = () => document.getElementsByClassName('blog-main')[0] || window
  const changeCollapsed = () => props.onCollapse(!collapsed)
  const getSelectOptions = (array) => {
    let item = null
    let options = []
    for (item of array) {
      if (item && item.key) {
        if (item.children) {
          options.push(<OptGroup key={item.key} label={item.name}>
            {getSelectOptions(item.children)}
          </OptGroup>)
        } else {
          options.push(<Option key={item.key} value={item.key.toString()}>{item.name || item.desc}</Option>)
        }
      }
    }
    return options
  }
  const getItemByKey = (key, items) => {
    let item = {}
    for (item of items) {
      if (item.key.toString() === key.toString()) {
        return item
      }
    }
    return null
  }
  const handleChange = key => {
    let item = getItemByKey(key, menuItems)
    props.routerPush('/blog/detail/' + item.key)
    props.getDetail({
      name: item.name,
      key: key
    })
  }
  return (
    <Affix target={getTarget}>
      <Header className='blog-main-header'>
        <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'}
          style={{ fontSize: 16, marginRight:20 }}
          onClick={changeCollapsed} />
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder='Select'
          optionFilterProp='children'
          onChange={handleChange}
          // onFocus={handleFocus}
          // onBlur={handleBlur}
          filterOption={(input, option) => {
            return option.props.children && option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }}
        >
          {getSelectOptions(menus)}
        </Select>
      </Header>
    </Affix>
  )
}

BlogHeader.propTypes = {
  blog: PropTypes.object,
  onCollapse: PropTypes.func,
  collapsed: PropTypes.bool,
  routerPush: PropTypes.func,
  getDetail: PropTypes.func
}

export default BlogHeader
