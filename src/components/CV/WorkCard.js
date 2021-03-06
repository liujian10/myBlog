import React from 'react';
import PropTypes from 'prop-types';
import { Card, Tag, Icon } from 'antd';
import './FlowBanner.less';

const WorkCard = props => {
  const {
    title,
    desc,
    poster,
    style = {},
    keyWords = [],
    fns = {}
  } = props;

  const {
    onClick = null,
    onOpen = null,
    onMouseOver = null,
    onMouseOut = null
  } = fns;

  const colors = [
    'pink',
    'red',
    'orange',
    'green',
    'cyan',
    'blue',
    'purple',
    'pink-inverse',
    'red-inverse',
    'orange-inverse'
  ];

  const getTagProp = (index) => {
    return {
      color: colors[index % 10],
      style: {
        fontSize: '60%',
        lineHeight: '150%',
        height: '100%'
      }
    };
  };
  return (
    <Card
      bodyStyle={{
        padding: 0
      }}
      className='cv-works-card'
      style={{
        ...style,
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(' + poster + ')',
        backgroundSize: '100% auto',
        backgroundPosition: 'center top'
      }}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <Tag
        key='open'
        color={colors[5]}
        className='cv-works-open'>
        <Icon type='arrows-alt' onClick={onOpen}/>
      </Tag>
      <div className='cv-works-items'>
        <h3>{title}</h3>
        <p>{desc}</p>
        <div>
          {
            keyWords.map((keyWord, index) => {
              return keyWord.url
                ? <a href={keyWord.url.indexOf('http') > -1 ? keyWord.url : '#' + keyWord.url} key={index}>
                  <Tag {...getTagProp(index)}>{keyWord.name}</Tag>
                </a>
                : <Tag key={index} {...getTagProp(index)}>{keyWord.name}</Tag>;
            })
          }
        </div>
      </div>
    </Card>
  );
};

WorkCard.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  poster: PropTypes.string,
  style: PropTypes.object,
  keyWords: PropTypes.array,
  fns: PropTypes.object
};

export default WorkCard;
