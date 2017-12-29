import './CvView.less';

import React from 'react';
import PropTypes from 'prop-types';
import {
  Layout,
  BackTop,
  Spin
} from 'antd';
import {
  CvHeader,
  CvModal,
  CvMain
} from '../../../components/CV';

import {
  HomeSider,
  HomeFooter
} from '../../../components/Home';

class CvView extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.getCvInfo().then(() => {
      setTimeout(this.props.adaptiveToUpdate, 100);
    });
    window.addEventListener('resize', this.props.adaptiveToUpdate);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.props.adaptiveToUpdate);
  }

  render () {
    const { pending } = this.props;

    // 获取滚动条元素
    const getTarget = () => document.getElementById('cv-main') || window;

    // Spin属性
    const spinProps = {
      className: 'cv-spain',
      style: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }
    };

    return (
      pending
        ? <div {...spinProps}>
          <Spin tip='Loading...'/>
        </div>
        : <Layout className='cv-layout'>
          <HomeSider {...this.props}/>
          <Layout className='cv-main' id='cv-main'>
            <CvHeader {...this.props}/>
            <CvMain {...this.props} />
            <HomeFooter {...this.props}/>
          </Layout>
          <BackTop target={getTarget}/>
          <CvModal {...this.props}/>
        </Layout>
    );
  }
}

CvView.propTypes = {
  getCvInfo: PropTypes.func,
  adaptiveToUpdate: PropTypes.func,
  pending: PropTypes.bool
};

export default CvView;
