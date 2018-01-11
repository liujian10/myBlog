import React from 'react';
import PropTypes from 'prop-types';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import './Waterfall.less';

class Waterfall extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      columns: []
    };
  }

  componentWillMount () {
    this.container = null; // 组件顶层容器
    this.imageIndex = 0; // 当前加载图片位置
    this.domColumns = []; // 瀑布列dom列表
    this.imageCaches = {
      current: 0,
      pending: false,
      end: false
    }; // 图片缓存集合
    this.cacheImage(); // 提前缓存图片
    this.scrollTop = 0;
  }

  componentDidMount () {
    const { target = window } = this.props;
    this.scrollEvent = addEventListener(target, 'scroll', this.handleScroll.bind(this));
    this.resizeEvent = addEventListener(window, 'resize', this.adaptiveToUpdate.bind(this));
    this.adaptiveToUpdate();
  }

  shouldComponentUpdate () {
    const newColumnNum = this.getColumnNum();
    return !this.isLoadEnd() && this.columnNum !== 0 && newColumnNum === this.columnNum;
  }

  componentWillUpdate () {
  }

  componentDidUpdate () {
    this.doAppend();
  }

  componentWillUnmount () {
    this.scrollEvent && this.scrollEvent.remove();
    this.resizeEvent && this.resizeEvent.remove();
  }

  /**
   * 获取滚动监听目标元素
   * @returns {*}
   */
  getScrollTarget () {
    const { getTarget } = this.props;
    if (typeof getTarget === 'function') {
      return getTarget();
    } else {
      return window.document.documentElement;
    }
  }

  /**
   * 获取最短列序号
   * @returns {element}
   */
  getShortestIndex () {
    let column, minIndex, minHeight;
    for (let index in this.domColumns) {
      column = this.domColumns[index];
      if (parseInt(index) === 0) {
        minIndex = 0;
        minHeight = column.clientHeight;
      }
      if (column.clientHeight < minHeight) {
        minIndex = index;
        minHeight = column.clientHeight;
      }
    }
    return minIndex;
  }

  /**
   * 是否加载完成
   */
  isLoadEnd () {
    const { source = [] } = this.props;
    return source.length < this.imageIndex;
  }

  /**
   * 是否应该执行添加图片操作
   * @returns {boolean}
   */
  shouldAppend () {
    const shortestIndex = this.getShortestIndex();
    const shortestColumn = this.domColumns[shortestIndex];
    if (this.props.source.length <= this.imageIndex || !shortestColumn || !this.container) return false;
    const clientHeight = this.container.clientHeight;
    const scrollTop = this.getScrollTarget().scrollTop;
    return shortestColumn && shortestColumn.offsetTop + shortestColumn.clientHeight < 100 + scrollTop + clientHeight *
      1.5;
  }

  /**
   * 是否需要缓存图片
   * @param num
   * @returns {boolean}
   */
  shouldCache (num) {
    const { current } = this.imageCaches;
    const { source } = this.props;
    let shouldCache = false;
    if (current > source.length) {
      this.imageCaches.end = true;
    } else {
      shouldCache = current <= this.imageIndex + num;
    }
    this.imageCaches.pending = shouldCache;
    return shouldCache;
  }

  /**
   * 缓存图片
   */
  cacheImage () {
    const { source = [] } = this.props;
    const CACHE_IMAGE_NUM = 3 * this.columnNum || 10; //一次缓存图片数量
    if (this.shouldCache(CACHE_IMAGE_NUM)) {
      const nextIndex = this.imageCaches.current++;
      if (!this.imageCaches[nextIndex]) {
        const url = source[nextIndex];
        let img = new Image();
        let timer;
        img.onload = () => {
          this.imageCaches[nextIndex] = img;
          clearInterval(timer);
          if (this.shouldCache(CACHE_IMAGE_NUM)) this.cacheImage();
        };
        img.src = url;
      } else {
        if (this.shouldCache(CACHE_IMAGE_NUM)) this.cacheImage();
      }
    }
  }

  /**
   * 执行添加图片操作
   */
  doAppend () {
    const index = this.imageIndex;
    const cacheImg = this.imageCaches[index];
    if (!this.shouldAppend()) return;
    if (!cacheImg) {
      if (!this.imageCaches.pending) {
        this.cacheImage();
      }
      setTimeout(() => {
        this.doAppend();
      }, 100);
      return;
    }
    const shortestIndex = this.getShortestIndex();
    const { columns } = this.state;
    const { source } = this.props;
    const shortestColumn = columns[shortestIndex];
    shortestColumn.push({
      img: source[index],
      index
    });
    columns[shortestIndex] = shortestColumn;
    this.imageIndex++;
    this.setState({
      columns
    });
  }

  /**
   * 获取列数
   * @returns {number}
   */
  getColumnNum () {
    const { columnWidth = 210 } = this.props;
    let containerWidth = this.container.clientWidth;
    return Math.floor((containerWidth - 20) / (columnWidth + 20));
  }

  /**
   * 初始化操作
   */
  adaptiveToUpdate () {
    if (!this.container) return;
    const newColumnNum = this.getColumnNum();
    if (newColumnNum === this.columnNum) return;
    const { source = [] } = this.props;
    this.domColumns = []; // 瀑布列dom列表
    this.columnNum = newColumnNum;
    this.imageIndex = 0;
    const columns = [];
    for (let i = 0; i < this.columnNum; i++) {
      columns.push([
        {
          img: source[i],
          index: this.imageIndex++
        }
      ]);
    }
    this.setState({ columns }); // 初始化瀑布列
  }

  /**
   * 处理滚动事件
   */
  handleScroll () {
    // 为提高性能，滚动前后距离大于100像素再处理
    const scrollTop = this.getScrollTarget().scrollTop;
    if (!this.isLoadEnd() && Math.abs(scrollTop - this.scrollTop) > 100) {
      this.scrollTop = scrollTop;
      this.cacheImage();
      this.doAppend();
    }
  }

  render () {
    const {
      renderItem = (ci, img) => {
        return <img src={img}/>;
      }
    } = this.props;
    const { columns } = this.state;
    const prefixCls = 'waterfall';
    return <div
      className={`${prefixCls}-container`}
      ref={e => {this.container = e;}}
    >
      {
        columns.map((column = [], index) => {
          return <div
            key={index}
            ref={column => {
              if (column) this.domColumns[index] = column;
            }}>{
            column.map((item, cIndex) => renderItem(cIndex, item.img, item.index))
          }</div>;
        })
      }
    </div>;
  }
}

Waterfall.propTypes = {
  target: PropTypes.element,
  source: PropTypes.array,
  columnWidth: PropTypes.number,
  renderItem: PropTypes.func,
  getTarget: PropTypes.func
};

export default Waterfall;
