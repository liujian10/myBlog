import './HomeView.less';

import React from 'react';
import PropTypes from 'prop-types';
import {
  Layout,
  BackTop,
  Spin
} from 'antd';
import {
  HomeSider,
  HomeHeader,
  HomeFooter,
  HomeMain
} from '../../../components/Home';

class HomeView extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.getCvInfo().then(() => {
      setTimeout(this.props.adaptiveToUpdate, 100);
    });
  }

  componentDidMount () {
    window.addEventListener('resize', this.props.adaptiveToUpdate);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.props.adaptiveToUpdate);
  }

  render () {
    const { pending } = this.props;

    // 获取滚动条元素
    const getTarget = () => window.document.getElementById('home-main') || window;

    return (
      pending
        ? <div className='maple-loading'>
          <Spin tip='Loading...' size='large'/>
        </div>
        : <Layout className='home-layout'>
          <HomeSider {...this.props}/>
          <Layout className='home-main' id='home-main'>
            <HomeHeader {...this.props} title='maple' target={getTarget}/>
            <HomeMain {...this.props} />
            <HomeFooter {...this.props}/>
          </Layout>
          <BackTop target={getTarget}/>
        </Layout>
    );
  }
}

HomeView.propTypes = {
  getCvInfo: PropTypes.func,
  adaptiveToUpdate: PropTypes.func,
  pending: PropTypes.bool
};

export default HomeView;
