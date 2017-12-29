import React from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import {
  Icon
} from 'antd';
import WorksBanner from './WorksBanner';

const CvModal = (props) => {
  const {
    showModal,
    assignProps,
    router,
    works,
    showKey
  } = props;

  // 模态窗口关闭按钮onClick事件
  const onModalCloseClick = () => {
    assignProps({
      showModal: false
    });
  };

  // 模态窗口链接按钮onClick事件
  const onModalLinkClick = () => {
    const { url = '#' } = works[showKey];
    if (url.indexOf('http') > -1) {
      window.location.href = url;
    } else {
      router.push(url);
    }
  };

  return (
    <QueueAnim type={['top', 'top']} delay={[0, 300]}>
      {showModal ? [
        <div key='modal-main' className='cv-modal'>
          <QueueAnim
            type={['top', 'bottom']} delay={[300, 0]}
            duration={[1000, 1000]}>
            {showModal ? [
              <div key='modal-box' className='cv-modal-box'>
                <WorksBanner {...props} />
              </div>
            ] : null}
          </QueueAnim>
          <QueueAnim
            type={['bottom', 'top']} delay={[300, 0]}
            duration={[1000, 1000]}>
            {showModal ? [
              <div
                key='modal-tool'>
                <Icon
                  type='link'
                  className='cv-modal-link'
                  onClick={onModalLinkClick}
                />
                <Icon
                  type='close'
                  className='cv-modal-close'
                  onClick={onModalCloseClick}
                />
              </div>
            ] : null}
          </QueueAnim>
        </div>
      ] : null}
    </QueueAnim>
  );
};

CvModal.propTypes = {
  modalWorks: PropTypes.array,
  showModal: PropTypes.bool,
  assignProps: PropTypes.func,
  router: PropTypes.object.isRequired,
  works: PropTypes.array,
  showKey: PropTypes.number
};

export default CvModal;
