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
  return (
    <Header className='blog-main-header'>
      <Icon
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        className='blog-header-icon-menu'
        onClick={changeCollapsed}
      />
      <Select
        showSearch
        style={{
          width: 300,
          borderRadius: '20px'
          // boxShadow: '0px 0px 10px 3px #e9e9e9'
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
      <div style={{ position: 'fixed', top: '20px', right: '5%' }}>
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
