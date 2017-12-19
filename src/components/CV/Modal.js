import React from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import {
  Icon
} from 'antd';
import WorksBanner from './WorksBanner';

const CvHeader = (props) => {
  const {
    modalWorks,
    showModal,
    onModalLinkClick,
    onModalCloseClick
  } = props;
  return (
    <QueueAnim type={['top', 'top']} delay={[0, 300]}>
      {showModal ? [
        <div key='modal-main' className='cv-modal'>
          <QueueAnim
            type={['top', 'bottom']} delay={[300, 0]}
            duration={[1000, 1000]}>
            {showModal ? [
              <div key='modal-box' className='cv-modal-box'>
                <WorksBanner
                  works={modalWorks} {...props} />
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

CvHeader.propTypes = {
  modalWorks: PropTypes.array,
  showModal: PropTypes.bool,
  onModalLinkClick: PropTypes.func,
  onModalCloseClick: PropTypes.func
};

export default CvHeader;
