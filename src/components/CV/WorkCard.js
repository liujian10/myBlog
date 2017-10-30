import React from 'react'
import PropTypes from 'prop-types'
import { Card, Tag } from 'antd'
import './FlowBanner.less'

const WorkCard = props => {
  const { title, desc, poster, style = {}, keyWords = [] } = props
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
  ]
  const getTagColor = index => {
    return colors[index % 10]
  }
  return (
    <Card
      bodyStyle={{
        padding: 0
      }}
      className='cv-works-card'
      style={{
        ...style,
        display:'block',
        width:'100%',
        height:'100%',
        backgroundRepeat:'no-repeat',
        backgroundImage:'url(' + poster + ')',
        backgroundSize:'100% auto',
        backgroundPosition:'center top'
      }}
    >
      <div style={{
        background:'rgba(255, 255, 255, 0.8)',
        position:'absolute',
        bottom:'0',
        left:'0',
        display:'block',
        width:'100%',
        padding:'10px 0'
      }}>
        <h3>{title}</h3>
        <p>{desc}</p>
        <div>
          {
            keyWords.map((keyWord, index) => {
              return keyWord.url ? <a href={keyWord.url} key={index}>
                <Tag color={getTagColor(index)} style={{ fontSize:'60%' }}>{keyWord.name}</Tag>
              </a> : <Tag key={index} color={getTagColor(index)} style={{ fontSize:'60%' }}>{keyWord.name}</Tag>
            })
          }
        </div>
      </div>
    </Card>
  )
}

WorkCard.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  poster: PropTypes.string,
  style:PropTypes.object,
  keyWords:PropTypes.array
}

export default WorkCard
