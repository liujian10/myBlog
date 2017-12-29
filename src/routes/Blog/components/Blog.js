import React from 'react';
import PropTypes from 'prop-types';
import BlogLayout from '../../../layouts/BlogLayout';
import { Spin } from 'antd';

class Blog extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      collapsed: false,
      showSearch: true,
      logoBackground: '#fff'
    };
  }

  componentWillMount () {
    this.props.getUserInfo();
    this.props.getMenus({}, ({ menus }) => {
      if (Array.isArray(menus) && menus.length) {
        let path = this.props.getIndexPath();
        path && this.props.router.replace(path);
      }
    });
  }

  componentDidMount () {
  }

  render () {
    const onCollapse = collapsed => {
      this.setState({ collapsed, showSearch: !collapsed });
    };

    const onSearch = folded => {
      this.setState({ showSearch: typeof folded === 'boolean' ? folded : !this.state.showSearch });
    };

    const routerPush = path => {
      this.props.router.push(path);
    };

    const blogProps = {
      ...{
        ...this.props,
        ...this.state,
        routerPush,
        onCollapse,
        onSearch
      }
    };

    if (this.props.children && this.props.blog) {
      return <BlogLayout {...blogProps} >
        {this.props.children}
      </BlogLayout>;
    }
    return (<Spin
      size='large'
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    />);
  }
}

Blog.propTypes = {
  getUserInfo: PropTypes.func,
  getMenus: PropTypes.func,
  getIndexPath: PropTypes.func,
  children: PropTypes.element,
  menus: PropTypes.array,
  router: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  showSearch: PropTypes.bool
};

export default Blog;
