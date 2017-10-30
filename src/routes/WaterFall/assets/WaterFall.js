const waterFall = {
  columnNumber: 1,// 当前列数量
  columns: [],// 列表集合
  scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
  // 获取列数量
  getColumnNumber: function () {
    return Math.floor((document.body.clientWidth - 20) / (this.columnWidth + 20));
  },
  // 设置新的列数量
  setColumnNumber: function () {
    this.columnNumber = this.getColumnNumber();
    this.columns = [];

    var index = 0, columnHtml = '';
    for (index; index < this.columnNumber; index++) {
      if (!document.getElementById("waterFallColumn_" + i)) {
        columnHtml += '<span id="waterFallColumn_' + index + '" class="column" style="width:' + this.columnWidth + 'px;">' +
          '</span> ';
      }
    }

    this.container.innerHTML = columnHtml;

    var i = 0;
    for (; i < this.columnNumber; i++) {
      this.columns.push(document.getElementById("waterFallColumn_" + i));
    }
  },
  // 返回最短列
  getShortestColumn: function () {
    var index, column, minIndex, minHeight;
    for (index in this.columns) {
      column = this.columns[index];
      if (index == 0) {
        minIndex = 0;
        minHeight = column.clientHeight;
      }
      if (column.clientHeight < minHeight) {
        minIndex = index;
        minHeight = column.clientHeight;
      }
    }
    return this.columns[minIndex];
  },
  // 图片缓存信息 一次缓存20张图片
  cache: {
    current: 20,//当前加载位置0-20
    count: 0//缓存图片总数
  },
  // 是否需要加载图片
  canAppend: function () {
    var minColumn = this.getShortestColumn();
    var clientHeight = window.innerHeight || document.documentElement.clientHeight;
    return !this.loadFinish
      && minColumn
      && minColumn.offsetTop + minColumn.clientHeight < 100 + (document.documentElement.scrollTop || document.body.scrollTop) + clientHeight * 1.5
  },
  // 是否滚动载入的检测
  appendDetect: function () {
    if (this.cache.current >= 20 && this.indexImage >= this.cache.count) {
      var list = [];
      var indexImage = parseInt(this.indexImage);
      var index = 0;
      for (; index < 20; index++) {
        if (indexImage + index < this.images.length) {
          list.push(this.images[indexImage + index]);
        } else {
          //alert("图片加载光光了！");
          this.loadFinish = true;
        }
      }
      this.cache.current = 0;
      this.append(list, indexImage);
    } else {
      this.doAppend();
    }
  },
  append: function (list, index) {
    var self = this, i;
    for (i in list) {
      var key = index++;
      if(!self.cache[key]){
        var imgUrl = list[i];
        var img = new Image();
        var timer;
        //兼容ie8 setInterval传值问题
        (function (img, key, timer) {
          timer = setInterval(function () {
            if (img.height > 0) {
              clearInterval(timer);
              self.cache[key] = img;
              self.cache.count++;
            }
          }, 100);
        })(img, key, timer);
        img.onLoad = function () {
          clearInterval(timer);
          self.cache[key] = img;
        };
        img.src = imgUrl;
      }
    }
    self.doAppend();
  },
  // 执行插入操作
  doAppend: function () {
    var index = this.indexImage, self = this;
    if (this.canAppend()) {
      var img = this.cache[index];
      if (!img) {
        setTimeout(function () {
          self.doAppend();
        }, 0);
        return;
      }

      this.createColumn.call(this, this.indexImage, img);
      this.cache.current++;
      this.indexImage++;

      if (this.canAppend()) {
        if (this.cache.current >= 20 && this.indexImage >= this.cache.count) {
          setTimeout(function () {
            self.appendDetect();
          }, 0);
        } else {
          setTimeout(function () {
            self.doAppend();
          }, 0);
        }
      }
    }
  },
  // 页面加载初始创建
  create: function () {
    this.indexImage = 0;
    this.loadFinish = false;

    this.setColumnNumber();
    this.appendDetect();
  },
  // 滚动加载
  scroll: function () {
    var self = this;
    window.onscroll = function () {
      // 为提高性能，滚动前后距离大于100像素再处理
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (!self.loadFinish && Math.abs(scrollTop - self.scrollTop) > 100) {
        self.scrollTop = scrollTop;
        self.appendDetect();
      }
    };
  },
  // 浏览器窗口大小变换
  resize: function () {
    var self = this;
    window.onresize = function () {
      var newCount = self.getColumnNumber();
      if (newCount !== self.columnNumber) {
        self.create();
      }
    };
    return this;
  },
  init: function (config) {
    this.container = config.container;
    this.images = config.images;
    this.columnWidth = config.width || 210;
    this.createColumn = config.createColumn;

    if (this.container) {
      this.create();
      this.scroll();
      this.resize();
    }
  }
};

export default waterFall
