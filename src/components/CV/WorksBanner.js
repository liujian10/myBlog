import React from 'react';
import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import PropTypes from 'prop-types';
import './WorksBanner.less';

const { Element } = BannerAnim;
const BgElement = Element.BgElement;

class WorksBanner extends React.Component {
  render () {
    const { works, showKey, showModal } = this.props;
    const modalWorks = works[showKey].detail;
    let bannerElementKey = 0;
    return (
      <BannerAnim prefixCls='banner-work'>
        {
          modalWorks.map(work => {
            const { title = '', desc = '', img = '' } = work;
            const BgStyle = {
              backgroundImage: 'url(' + img + ')',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            };
            const key = ++bannerElementKey;
            const bgId = 'bg' + key;
            const titleId = 'title' + key;
            const contentId = 'content' + key;
            return <Element
              key={key}
              prefixCls='banner-work-elem'
              followParallax={{
                delay: 1000,
                data: [
                  { id: bgId, value: 20, bgPosition: '50%', type: ['backgroundPositionX'] },
                  { id: titleId, value: 50, type: 'x' },
                  { id: contentId, value: -30, type: 'x' }
                ]
              }}
            >
              <BgElement
                key='bg'
                id={bgId}
                className='bg'
                style={BgStyle}
              />
              <div className='banner-work-content'>
                <QueueAnim
                  id={titleId}
                  type='top'
                  delay={200}
                >
                  {showModal ? <h1 key='title'>{title}</h1> : null}
                </QueueAnim>
                <QueueAnim
                  id={contentId}
                  type='bottom'
                  delay={200}
                >
                  {showModal ? <p key='desc'>{desc}</p> : null}
                </QueueAnim>
              </div>
            </Element>;
          })
        }
      </BannerAnim>
    );
  }
}

WorksBanner.propTypes = {
  showKey: PropTypes.number,
  works: PropTypes.array,
  showModal: PropTypes.bool
};

export default WorksBanner;
