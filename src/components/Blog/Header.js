import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon, Select, Breadcrumb } from 'antd';

const { Header } = Layout;
const { Option, OptGroup } = Select;

const BlogHeader = (props) => {
  const { blog, collapsed, onSearch } = props;
  const { menus = [], menuItems = [] } = blog;
  const changeCollapsed = () => props.onCollapse(!collapsed);
  const getSelectOptions = (array) => {
    let item = null;
    let options = [];
    for (item of array) {
      if (item && item.key) {
        if (item.children) {
          options.push(<OptGroup key={item.key} label={item.title || item.file || item.desc}>
            {getSelectOptions(item.children)}
          </OptGroup>);
        } else {
          options.push(<Option key={item.key} value={item.key.toString()}>{item.title || item.file ||
          item.desc}</Option>);
        }
      }
    }
    return options;
  };
  const getItemByKey = (key, items) => {
    let item = {};
    for (item of items) {
      if (item.key.toString() === key.toString()) {
        return item;
      }
    }
    return null;
  };
  const handleChange = key => {
    let item = getItemByKey(key, menuItems);
    props.routerPush('/blog/detail/' + item.key);
    props.getDetail({
      title: item.title,
      key: key
    });
  };
  const hideSearch = () => onSearch(!collapsed);

  const headerStyle = {
    position: 'fixed',
    display: 'block',
    width: '60%',
    minWidth: '500px',
    textAlign: 'left'
  };
  return (
    <Header className='blog-main-header' style={headerStyle}>
      <Icon
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        className='blog-header-icon-menu'
        onClick={changeCollapsed}
      />
      <Select
        showSearch
        style={{
          width: 280
        }}
        placeholder='Search'
        optionFilterProp='children'
        onChange={handleChange}
        onBlur={hideSearch}
        filterOption={(input, option) => {
          return option.props.children && option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }}
      >
        {getSelectOptions(menus)}
      </Select>
      <div className='blog-header-breadcrumb'>
        <Breadcrumb {...props} />
      </div>
    </Header>
  );
};

BlogHeader.propTypes = {
  blog: PropTypes.object,
  onCollapse: PropTypes.func,
  collapsed: PropTypes.bool,
  routerPush: PropTypes.func,
  getDetail: PropTypes.func,
  onSearch: PropTypes.func
};

export default BlogHeader;
