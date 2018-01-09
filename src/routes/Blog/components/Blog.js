import React from 'react';
import PropTypes from 'prop-types';
import BlogLayout from '../../../layouts/BlogLayout';
import { Spin } from 'antd';

class Blog extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      collapsed: false,
      showSearch: false,
      showSearchIcon: true,
      logoBackground: '#fff'
    };
  }

  componentWillMount () {
    const { getUserInfo, router, getMenus } = this.props;
    getUserInfo();
    getMenus({}, ({ menus }) => {
      if (/^#\/blog((?!\/).)*$/.test(window.location.hash)) {
        const defaultBlog = menus[0];
        defaultBlog && defaultBlog.key && router.replace(`/blog/detail/${defaultBlog.key}`);
      }
    });
  }

  componentWillUpdate () {
    const { router, blog } = this.props;
    if (/^#\/blog((?!\/).)*$/.test(window.location.hash)) {
      const defaultBlog = blog.menus[0];
      defaultBlog && defaultBlog.key && router.replace(`/blog/detail/${defaultBlog.key}`);
    }
  }

  render () {
    const { children, blog } = this.props;
    const loadSpain = <div className='maple-loading'><Spin tip='Loading...' size='large'/></div>;

    const onCollapse = collapsed => {
      const newState = {
        collapsed
      };
      if (collapsed) {
        newState.showSearch = false;
      } else {
        newState.showSearchIcon = false;
      }
      this.setState({ ...newState });
    };

    const changeSearchShow = folded => {
      if (this.state.showSearch !== folded) {
        const showSearch = typeof folded === 'boolean' ? folded : !this.state.showSearch;
        this.setState({ showSearch });
      }
    };

    const changeIconShow = folded => {
      if (this.state.showSearchIcon !== folded) {
        const showSearchIcon = typeof folded === 'boolean' ? folded : !this.state.showSearchIcon;
        this.setState({ showSearchIcon });
      }
    };

    const goToDetail = key => {
      this.props.router.push(`/blog/detail/${key}`);
    };

    const blogProps = {
      ...{
        ...this.props,
        ...this.state,
        goToDetail,
        onCollapse,
        changeSearchShow,
        changeIconShow
      }
    };

    if (children && blog) {
      return <BlogLayout {...blogProps} >
        {children}
      </BlogLayout>;
    }
    return (loadSpain);
  }
}

Blog.propTypes = {
  getUserInfo: PropTypes.func,
  getMenus: PropTypes.func,
  children: PropTypes.element,
  router: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired
};

export default Blog;
