import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { OverPack } from 'rc-scroll-anim';
import {
  Layout,
  Timeline
} from 'antd';
import CvCard from './CvCard';
import WorkCard from './WorkCard';
import FlowBanner from './FlowBanner';

const { Content } = Layout;

const CvMain = (props) => {
  const {
    isMobile,
    titles,
    works,
    careers,
    technologies,
    educations,
    getCardAnimationProps,
    onCardClick
  } = props;

  return (
    <Content className='cv-content'>
      <QueueAnim key='anim-work' type='top' duration={1000}>
        <div key='cv-works'>
          <CvCard title={titles.works} style={{ padding: '5px 0' }}>
            {
              isMobile
                ? <QueueAnim
                  className='cv-works-group' delay={300}
                  type='right' duration={1000}>
                  {
                    works.map((work, index) => {
                      return <div
                        key={index}
                        className='cv-works-item'>
                        <TweenOne {...getCardAnimationProps(index, {
                          width: '200px',
                          height: '150px'
                        }, true)}>
                          <WorkCard
                            {...work}
                            fns={{
                              onOpen: onCardClick.bind(null, index)
                            }}/>
                        </TweenOne>
                      </div>;
                    })
                  }
                </QueueAnim> : <QueueAnim
                  className='cv-works-group' delay={300}
                  type='right' duration={1000}>
                  <FlowBanner
                    {...props}
                    clickFunc={onCardClick}
                  />
                </QueueAnim>
            }
          </CvCard>
        </div>
      </QueueAnim>
      <QueueAnim key='anim-career' type='bottom' duration={1000}>
        <div key='cv-careers' style={{ padding: '5px 0' }}>
          <CvCard title={titles.careers}>
            <Timeline>
              {
                careers.map((career, index) => {
                  return <Timeline.Item key={index}>
                    <h4>{career.from + '-' + career.to + ' | ' +
                    career.company + ' | ' +
                    career.position}</h4>
                    {
                      career.work.map((item, i) => {
                        return <p key={i}>{item}</p>;
                      })
                    }
                  </Timeline.Item>;
                })
              }
            </Timeline>
          </CvCard>
        </div>
      </QueueAnim>
      <OverPack
        targetId='cv-main'
        playScale={0}>
        <QueueAnim key='anim-technologies' type='bottom'>
          <div key='cv-technologies' style={{ padding: '5px 0' }}>
            <CvCard title={titles.technologies}>
              {
                technologies.map((technology, index) => {
                  return <div key={index} style={{ marginBottom: '.2rem' }}>
                    <h3>{technology.name}</h3>
                    <ul>
                      {
                        technology.desc.map((item, index) => {
                          return <li
                            key={index}
                            style={{
                              listStyle: 'circle',
                              marginLeft: '.25rem'
                            }}>
                            {item}
                          </li>;
                        })
                      }
                    </ul>
                  </div>;
                })
              }
            </CvCard>
          </div>
        </QueueAnim>
      </OverPack>
      <OverPack
        targetId='cv-main'
        playScale={0.1}>
        <QueueAnim key='anim-education' type='bottom'>
          <div key='cv-education' style={{ padding: '5px 0' }}>
            <CvCard title={titles.educations}>
              <Timeline>
                {
                  educations.map((education, index) => {
                    return <Timeline.Item
                      color='green'
                      key={index}>
                      <h4>{education.from + '-' + education.to + ' | ' +
                      education.school + ' | ' +
                      education.science}</h4>
                    </Timeline.Item>;
                  })
                }
              </Timeline>
            </CvCard>
          </div>
        </QueueAnim>
      </OverPack>
    </Content>
  );
};

export default CvMain;
