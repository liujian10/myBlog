import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Avatar, Popover, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import './Sider.less';

const { SubMenu } = Menu;
const BlogSider = (props) => {
  const { blog } = props;
  const { menus = [], userInfo = {}, detail = {} } = blog;
  const { nickName, gender, github, email, headPic } = userInfo;
  const handleClick = ({ key }) => {
    props.goToDetail(key);
  };

  const getMenuItem = (data) => {
    let res;
    const title = data.title || data.file || data.desc;
    const menuTitle = <span><Icon type='bars'/><span>{title}</span></span>;
    if (data.key) {
      if (data.children) {
        res = <SubMenu
          key={data.key}
          title={menuTitle}>
          {data.children.map(function (child) {
            return getMenuItem(child);
          })}
        </SubMenu>;
      } else {
        res = <Menu.Item {...data} >
          <span>{title} </span>
        </Menu.Item>;
      }
    }
    return res;
  };
  const userContent = (
    <div>
      <p>Git：<a href={github}>{github}</a></p>
      <p>邮箱：<a href={'mailto:' + email}>{email}</a></p>
    </div>
  );
  const userTitle = (
    <div>
      {nickName}
      <Icon type={gender ? 'man' : 'woman'} style={{ marginLeft: '5px' }}/>
    </div>
  );
  return (
    <QueueAnim type={['left', 'right']} ease={['easeOutQuart', 'easeInOutQuart']}>
      {props.collapsed ? null : [
        <div
          key='sider-logo'
          className={props.collapsed ? 'blog-logo-normal' : 'blog-logo-collapsed'}
          style={{
            textAlign: 'center'
          }}>
          <Popover
            title={userTitle}
            content={userContent}
            arrowPointAtCenter
          >
            <Avatar src={headPic} style={{ background: props.logoBackground }}/>
            <span className='blog-log-text'>{nickName}</span>
          </Popover>
        </div>,
        menus.length > 0 ? <Menu
          key='sider-menu'
          // collapsible
          defaultSelectedKeys={[detail.currentKey]}
          selectedKeys={[detail.currentKey]}
          onClick={handleClick}
          mode='inline'
          style={{ height: '100%' }}
        >
          {
            menus && menus.map && menus.map(item => {
              return getMenuItem(item);
            })
          }
        </Menu> : null
      ]}
    </QueueAnim>
  );
};

BlogSider.propTypes = {
  blog: PropTypes.object,
  collapsed: PropTypes.bool,
  goToDetail: PropTypes.func,
  logoBackground: PropTypes.string
};

export default BlogSider;
