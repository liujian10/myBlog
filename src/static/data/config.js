// 个人简介信息
export const introduction = {
  name: '刘建',
  age: '24岁',
  nationality: '汉族',
  party: '党员',
  desc: '前端攻城狮，热爱学习，喜欢探索，React,Vue爱好者，努力学习中...',
  mobile: '18600935074',
  email: 'mapleliu1@gmail.com',
  website: 'mapleliu.com',
  gitHub: 'github.com/liujian10'
};

// 海报资源
/*
milk-vue01.jpg
milk-vue02.jpg
myBlog01.jpg
myBlog02.jpg
tvCahier03.jpg
tvCahier05.jpg
tvCashier01.jpg
tvCashier02.jpg
tvCashier04.jpg
v-draver01.jpg
v-drawer02.jpg
vipCenter02.jpg
vipCenter01.jpg
vipCenter03.jpg
vipCenter04.jpg
waterFall.jpg
*/
export const posters = [
  'http://i3.letvimg.com/lc07_iscms/201710/27/15/34/75789c76310c4044889762bde23ad619.jpg',
  'http://i0.letvimg.com/lc02_iscms/201710/27/15/38/a32ed7012658428f9234e9f386825dff.jpg',
  'http://i3.letvimg.com/lc04_iscms/201710/27/17/09/162391817c9f4eb1b0e82dbf434c9e9a.jpg',
  'http://i0.letvimg.com/lc07_iscms/201710/27/17/26/1cc9e6e2324142f2bc1c51cdd769c235.jpg',
  'http://i3.letvimg.com/lc06_iscms/201710/27/17/45/bf000ffd06af43eb8f06fc28dff9c39a.jpg',
  'http://i2.letvimg.com/lc04_iscms/201710/27/17/53/2936d26867734effaabaeba18dd40201.jpg',
  'http://i0.letvimg.com/lc03_iscms/201710/27/18/33/41a8e0538b3645bf98aecf7ea7cbc20d.jpg',
  'http://i1.letvimg.com/lc07_iscms/201710/27/18/37/2b968fc07b2041fb812aea38e63d49c6.jpg',
  'http://i2.letvimg.com/lc07_iscms/201710/27/18/40/3a3a82a953cf484aa5586b1dfa4dcda7.jpg',
  'http://i2.letvimg.com/lc02_iscms/201710/27/18/44/3ee38b5e46cc4d77987179356225bfa8.jpg'
];

const noPoster = 'http://i3.letvimg.com/lc04_iscms/201710/27/18/13/552a36f67da841a9b316312ab98b6a67.jpg';
// 项目&作品资源
export const works = [
  {
    title: '博客',
    desc: '基于React的博客demo',
    keyWords: [
      {
        name: 'React',
        url: 'https://reactjs.org/'
      },
      {
        name: 'Ant Design',
        url: 'https://ant.design/'
      },
      {
        name: 'Blog',
        url: '/myBlog'
      }
    ],
    poster: posters[0],
    url: '/blog',
    detail: [
      {
        title: '主页面',
        desc: '左侧菜单栏，头部搜索栏，右侧为博客内容',
        img: posters[0]
      },
      {
        title: '主页面',
        desc: '隐藏菜单栏的主页面',
        img: posters[1]
      }
    ]
  },
  {
    title: 'TV收银台',
    desc: '乐视影视会员TV收银台',
    keyWords: [
      {
        name: 'JavaScript'
      },
      {
        name: 'HTML5&CSS3'
      }
    ],
    poster: posters[3],
    url: 'http://minisite.cp21.ott.cibntv.net/tvCashierH5/index.shtml',
    detail: [
      {
        title: '主页面',
        desc: '左侧包含宣传海报，底部套餐选择栏；右侧展示用户信息，套餐信息及收银二维码，用户可直接通过支付宝/微信扫描下单充值会员。',
        img: posters[3]
      },
      {
        title: '支付挽留页',
        desc: '用户退出时，挽留用户页面，分为功能区与底部会员影片海报展示区',
        img: posters[4]
      },
      {
        title: '支付成功页',
        desc: '支付成功结果展示页，头部展示用户信息，订单信息，及赠品信息；底部展示会员影片海报',
        img: posters[5]
      }
    ]
  },
  {
    title: '影视会员中心',
    desc: '乐视网影视会员中心',
    keyWords: [
      {
        name: 'JavaScript'
      },
      {
        name: 'HTML5&CSS3'
      }
    ],
    poster: posters[6],
    url: 'http://minisite.cp21.ott.cibntv.net/tvCashierH5/index.shtml',
    detail: [
      {
        title: '主页面',
        desc: '展示用户会员信息，会员权益，运营活动，会员影片等',
        img: posters[6]
      },
      {
        title: '会员福利社',
        desc: '乐视影视会员福利专区，可领取会员福利',
        img: posters[7]
      },
      {
        title: '会员续费管理',
        desc: '管理影视会员续费，可开通及退订自动续费服务',
        img: posters[8]
      },
      {
        title: '会员俱乐部',
        desc: '展示乐视影视会员专题，活动信息',
        img: posters[9]
      }
    ]
  },
  {
    title: 'ABB中国班车项目',
    desc: '使用Bootstrap开发的Java Web项目',
    keyWords: [
      {
        name: 'Java'
      },
      {
        name: 'Bootstrap',
        url: 'http://www.bootcss.com/'
      },
      {
        name: '高德地图api',
        url: 'http://lbs.amap.com/api/javascript-api/summary'
      }
    ],
    poster: noPoster,
    url: '#',
    detail: [
      {
        title: 'ABB中国班车项目',
        desc: '使用Bootstrap搭建前端页面框架，结合高德地图api实现地图相关功能，后台采用SpringMVC搭建，数据库使用Mysql',
        img: noPoster
      }
    ]
  },
  {
    title: '瀑布流',
    desc: '一个简单的瀑布流demo',
    keyWords: [
      {
        name: 'JavaScript'
      }
    ],
    poster: posters[2],
    url: '/fallWater',
    detail: [
      {
        title: '主页面',
        desc: '原生JS实现的瀑布流demo，等列宽，根据图片高度自动填充页面，优化了图片加载逻辑',
        img: posters[2]
      }
    ]
  }
];
// 工作经历
export const careers = [
  {
    logo: '//static.lagou.com/i/image/M00/51/78/CgpFT1l6n3WAZqRdAAAsqV7CDLg777.png',
    company: '乐视网信息技术有限公司',
    position: '前端工程师',
    from: '2016年1月',
    to: '至今',
    work: [
      '1. 负责开发乐视影视会员web前端项目，主要为运营活动开发与乐视网会员页面开发/维护两块，开发内容包含移动端/PC站/TV端三端页面；',
      '2. 负责一个前端开发小组【最多时15人】项目/团队管理工作，带领团队出色完成数十个运营活动及项目的开发工作。'
    ]
  },
  {
    company: '北京酷博灵科信息技术有限公司',
    position: 'web开发工程师',
    from: '2014年8月',
    to: '2016年1月',
    work: [
      '1. 参与多个web端项目全栈开发工作；',
      '2. 参与项目产品设计、数据库设计。'
    ]
  }
];
// 教育经历
export const educations = [
  {
    school: '荆楚理工学院',
    science: '计算机科学与技术 本科',
    from: '2011年9月',
    to: '2015年6月'
  },
  {
    school: '一个普通高中0.0',
    science: '理科',
    from: '2011年6月',
    to: '2008年9月'
  }
];
// 技术栈
export const technologies = [
  {
    name: 'HTML&CSS',
    desc: [
      '能够熟练使用HTML5+CSS3开发页面，兼容主流浏览器；',
      '熟悉LESS、SASS等CSS预处理语言；',
      '能够熟练使用 Bootstrap 框架。'
    ]
  },
  {
    name: 'JavaScript',
    desc: [
      '熟悉原生JavaScript、ES6；',
      '能够熟练使用 jQuery/Zepto等js框架、Ajax、Fetch 等数据交互技术；',
      '能够熟练使用自动化构建工具Gulp，了解Webpack；',
      '熟悉Echarts、Swiper等js插件。'
    ]
  },
  {
    name: 'React',
    desc: [
      '熟悉React，熟悉Ant Design组件库，做过一些个人小项目。'
    ]
  },
  {
    name: 'Vue',
    desc: [
      '熟悉Vue，写过一个npm组件，参与维护组件库 Milk-vue。'
    ]
  },
  {
    name: 'Other',
    desc: [
      '从事过Java开发工作，对Java开发技术、数据库技术及开发流程比较了解，能够很好的与后台开发人员进行协作；',
      '熟悉PS、Axure RP、Fiddler等工具软件。'
    ]
  }
];
export const titles = {
  works: '作品&项目',
  educations: '教育经历',
  careers: '工作经历',
  technologies: '技术栈'
};

export const project = {
  'author': 'Maple Liu',
  'gitHub': 'https://github.com/liujian10/myBlog',
  'support': {
    'Ant Design': 'https://ant.design/index-cn',
    'Ant Motion': 'https://motion.ant.design/',
    'React Redux Starter Kit': 'https://github.com/davezuko/react-redux-starter-kit'
  }
};

export default {
  introduction,
  educations,
  works,
  careers,
  technologies,
  titles,
  project
};
