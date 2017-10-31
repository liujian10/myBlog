// 个人简介信息
export const introduction = {
  name: 'Maple',
  age: 'xx',
  nationality: 'xx',
  party: 'xx',
  desc: '我是简介,我是简介,我是简介,我是简介,我是简介,我是简介,我是简介,我是简介,我是简介,我是简介,我是简介,我是简介,我是简介,我是简介,我是简介,我是简介,我是简介,我是简介,我是简介,我是简介,我是简介',
  mobile: '12345678901',
  email: '123@mail.com',
  website: 'test.com',
  gitHub: 'github.com/test'
};
// 海报资源
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
        url: '/blog'
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
    title: 'TVDemo',
    desc: 'A demo of Tv',
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
    title: 'MDemo',
    desc: 'A demo of mobile',
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
        url: '/blog'
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
    title: 'ABB',
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
    company: 'XXX',
    position: 'XX',
    from: '2016年1月',
    to: '至今',
    work: [
      '1. 我是内容，我是内容，我是内容，我是内容；',
      '2. 我是内容，我是内容，我是内容，我是内容；',
      '3. 我是内容，我是内容，我是内容。'
    ]
  },
  {
    company: 'XXX',
    position: 'XX',
    from: '2014年8月',
    to: '2016年1月',
    work: [
      '1. 我是内容，我是内容，我是内容，我是内容；',
      '2. 我是内容，我是内容，我是内容，我是内容。'
    ]
  }
];
// 教育经历
export const educations = [
  {
    school: 'XXX',
    science: 'XXX XX',
    from: '2011年9月',
    to: '2015年6月'
  },
  {
    school: 'XXX XX',
    science: 'XX',
    from: '2011年6月',
    to: '2008年9月'
  }
];
// 技术栈
export const technologies = [
  {
    name: 'XXX',
    desc: [
      '我是内容，我是内容，我是内容，我是内容;',
      '我是内容，我是内容，我是内容，我是内容;',
      '我是内容，我是内容，我是内容，我是内容。'
    ]
  },
  {
    name: 'XXX',
    desc: [
      '我是内容，我是内容，我是内容，我是内容；',
      '我是内容，我是内容，我是内容，我是内容；',
      '我是内容，我是内容，我是内容，我是内容；',
      '我是内容，我是内容，我是内容，我是内容。'
    ]
  },
  {
    name: 'XXX',
    desc: [
      '我是内容，我是内容，我是内容，我是内容。'
    ]
  },
  {
    name: 'XXX',
    desc: [
      '我是内容，我是内容，我是内容，我是内容；',
      '我是内容，我是内容，我是内容，我是内容。'
    ]
  }
];

export const titles = {
  works:'我是标题一',
  careers:'我是标题二',
  technologies:'我是标题三',
  educations:'我是标题四'
};
