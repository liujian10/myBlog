import React from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import { Layout, Icon, Select, Breadcrumb } from 'antd';

const { Header } = Layout;
const { Option, OptGroup } = Select;

const BlogHeader = (props) => {
  const { blog, collapsed, changeSearchShow, changeIconShow, showSearch, showSearchIcon } = props;
  const { menus = [], menuItems = [] } = blog;
  const changeCollapsed = () => props.onCollapse(!collapsed);
  const getSelectOptions = (array) => {
    let item = null;
    let options = [];
    for (item of array) {
      if (item && item.key) {
        if (item.children) {
          options.push(
            <OptGroup key={item.key} label={item.title || item.file || item.desc}>
              {getSelectOptions(item.children)}
            </OptGroup>
          );
        } else {
          options.push(
            <Option key={item.key} value={item.key.toString()}>
              {item.title || item.file || item.desc}
            </Option>
          );
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
    props.goToDetail(item.key);
  };

  const headerStyle = {
    position: 'fixed',
    display: 'block',
    width: '60%',
    minWidth: '500px',
    textAlign: 'left'
  };

  const animCOnfig = {
    component: 'span',
    type: ['left', 'right'],
    ease: 'easeInOutQuart',
    duration: 500
  };
  return (
    <Header className='blog-main-header' style={headerStyle}>
      <Icon
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        className='blog-header-icon-menu'
        onClick={changeCollapsed}
      />
      <QueueAnim
        key='anim-icon'
        {...animCOnfig}
        onEnd={({ type }) => type === 'leave' && changeSearchShow(true)}
      >
        {
          showSearchIcon ? <Icon
            key='icon'
            type='search'
            className='blog-header-icon-menu'
            onMouseOver={() => changeIconShow(false)}
          /> : null
        }
      </QueueAnim>
      <QueueAnim
        key='anim-search'
        {...animCOnfig}
        onEnd={({ type }) => type === 'leave' && changeIconShow(true)}
      >
        {
          showSearch ? <Select
            key='search'
            showSearch
            style={{
              width: 280
            }}
            placeholder='Search'
            optionFilterProp='children'
            onChange={handleChange}
            onBlur={() => changeSearchShow(false)}
            filterOption={(input, option) => {
              return option.props.children && option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            }}
          >
            {getSelectOptions(menus)}
          </Select> : null
        }
      </QueueAnim>
      <div className='blog-header-breadcrumb'>
        <Breadcrumb {...props} />
      </div>
    </Header>
  );
};

BlogHeader.propTypes = {
  blog: PropTypes.object,
  onCollapse: PropTypes.func,
  changeSearchShow: PropTypes.func,
  changeIconShow: PropTypes.func,
  collapsed: PropTypes.bool,
  showSearch: PropTypes.bool,
  showSearchIcon: PropTypes.bool,
  goToDetail: PropTypes.func,
  getDetail: PropTypes.func
};

export default BlogHeader;
