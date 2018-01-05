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
        this.goToIndex(menus[0]);
      }
    });
  }

  componentWillUpdate (nextProps) {
    const { location } = nextProps;
    if (/^\/blog((?!\/).)*$/.test(location.pathname)) {
      this.goToIndex();
    }
  }

  goToIndex (menu) {
    const { router, blog } = this.props;
    let home = menu || blog.menus[0] || {};
    const pathname = router.location.pathname;
    if (/^\/blog((?!\/).)*$/.test(pathname)) {
      home && home.key && router.replace(pathname + '/detail/' + home.key);
    }
  }

  render () {
    const { children, blog } = this.props;
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

    if (children && blog) {
      return <BlogLayout {...blogProps} >
        {children}
      </BlogLayout>;
    }
    return (<div className='maple-loading'><Spin tip='Loading...' size='large'/></div>);
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
