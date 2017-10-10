import React from 'react'
import './WaterFall.less'
import waterFall from '../assets/WaterFall'

class WaterFall extends React.Component {
  componentDidMount () {
    let images = []
    let i = 0
    for (; i < 320; i++) {
      let index = parseInt(i < 163 ? i : i - 162)
      if (index < 10) {
        index = '00' + index
      } else if (index < 100) {
        index = '0' + index
      }
      images.push('http://cued.xunlei.com/demos/publ/img/P_' + index + '.jpg')
    }
    waterFall.init({
      container: document.getElementById('container'),
      width: 210,
      images: images,
      createColumn:function (index, img) {
        let aEle = document.createElement('a')
        aEle.href = '###'
        aEle.className = 'pic_a'
        try {
          aEle.appendChild(img)
        } catch (e) {
          console.log(e)
        }
        let strong = document.createElement('strong')
        strong.innerHTML = index < 10 ? ('00' + index) : index < 100 ? ('0' + index) : index
        aEle.appendChild(strong)
        let column = this.getShortestColumn()
        column.appendChild(aEle)
      }
    })
  }
  render () {
    return <div id='container' />
  }
}

export default WaterFall
