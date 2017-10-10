import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Affix, Avatar, Select } from 'antd'
import './Header.less'
const { Header } = Layout
const { Option, OptGroup } = Select

const BlogHeader = (props) => {
  const { blog, collapsed, showSearch, onSearch } = props
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
  const hideSearch = () => onSearch(!collapsed)
  return (
    <Affix target={getTarget}>
      <Header className={collapsed ? 'blog-main-fold' : 'blog-main-header'}>
        <Avatar
          icon='search'
          style={{
            display : (collapsed ? 'inline-block' : 'none'),
            verticalAlign : 'middle',
            marginRight: '5px'
          }}
          onClick={onSearch}
        />
        <Select
          showSearch
          style={{
            width: 200,
            display : (showSearch ? 'inline-block' : 'none'),
            borderRadius: '20px',
            boxShadow: '0px 0px 10px 3px #e9e9e9'
          }}
          placeholder='Select'
          optionFilterProp='children'
          onChange={handleChange}
          onBlur={hideSearch}
          filterOption={(input, option) => {
            return option.props.children && option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }}
        >
          {getSelectOptions(menus)}
        </Select>
        <Avatar
          icon='right'
          style={{ display : (collapsed ? 'block' : 'none') }}
          onClick={changeCollapsed}
        />
      </Header>
    </Affix>
  )
}

BlogHeader.propTypes = {
  blog: PropTypes.object,
  onCollapse: PropTypes.func,
  collapsed: PropTypes.bool,
  showSearch: PropTypes.bool,
  routerPush: PropTypes.func,
  getDetail: PropTypes.func,
  onSearch: PropTypes.func,
}

export default BlogHeader
