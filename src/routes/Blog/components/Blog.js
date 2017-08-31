import React from 'react'
import { Layout, Menu, Row, Col, Card, Icon, Avatar, Popover, Spin } from 'antd'
import './Blog.less'
/* import waterFall from 'water-fall' */
const { Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu

/**
 * 列卡片自定义组件，返回卡片列表
 * @param param
 * @returns {XML}
 * @constructor
 */
const ColCards = (param) => {
  let list = param.data
  const handleClick = (path) => {
    param.handleClick(path)
  }
  let getPDesc = (key, desc) => {
    let res = []
    let i = 0
    let length = (key % 20 + 1) * 5
    for (; i < length; i++) {
      res += desc + ' '
    }
    return <p className='blog-card-content' title={res}>
      {res}
    </p>
  }
  let count = 1
  return <Row style={{ padding:'10px' }} type='flex' justify='center' align='top'>
    {
      list.map(function (item) {
        let iconValue = item.icon
          ? <Icon type={item.icon} className={item.class} />
          : <Icon className={item.class} />
        return <Col key={item.key} xs={24} sm={23} md={22} lg={21} xl={20} style={{ padding:'10px' }}>
          <Card
            title={<span>{iconValue} {count++ + '.' + item.key + '|' + item.desc}</span>}
            extra={
              <Icon onClick={() => handleClick('/blog/' + item.key)} type='ellipsis' style={{ fontSize: 18 }} />
            }
            style={{ width: '100%' }}>
            { getPDesc(item.key, item.desc) }
          </Card>
        </Col>
      })
    }
  </Row>
}

/**
 * 递归获取菜单全部内容
 * @param data
 * @returns {*}
 */
const getMenuItem = (data) => {
  let res
  if (data.key) {
    if (data.children) {
      res = <SubMenu
        key={data.key}
        title={<span><Icon type={data.icon} /><span>{data.desc}</span></span>}>
        {
          data.children.map(function (child) {
            return getMenuItem(child)
          })
        }
      </SubMenu>
    } else {
      res = <Menu.Item key={data.key} >
        {data.icon ? <Icon type={data.icon} className={data.class} /> : <Icon className={data.class} />}
        <span>{data.desc} </span>
      </Menu.Item>
    }
  }
  return res
}

class Blog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: true,
      currentKey:'1',
      logoBackground:'#fff'
    }
  }
  componentWillMount () {
    this.props.getUserInfo()
    this.props.getMenus()
  }
  componentDidMount () {
    /* waterFall.init({
      container: document.getElementById('container'),
      width: 210,
      images: (function () {
        let res = []
        let i = 0
        for (; i < 320 ; i++) {
          let index = parseInt(i < 163 ? i : i - 162)
          if (index < 10) {
            index = '00' + index
          } else if (index < 100) {
            index = '0' + index
          }
          res.push('http://cued.xunlei.com/demos/publ/img/P_' + index + '.jpg')
        }
        return res
      }()),
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
    }) */
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed })
  }
  render () {
    const { props, state } = this
    const { blog, router } = props
    const { userInfo = {}, menus = [] } = blog
    let cards = []
    if (Array.isArray(menus)) {
      const addCards = (data) => {
        for (let cardItem of data) {
          if (cardItem.children) {
            addCards(cardItem.children)
          } else {
            cards.push(cardItem)
          }
        }
      }
      addCards(menus)
    }
    const routerPush = (path) => {
      router.push(path)
    }
    const handleClick = (e) => {
      routerPush('/blog/' + e.key)
    }
    const getSiderStyle = (collapsed) => {
      return collapsed ? {
        background : '#fff',
        height:'100%'
      } : {
        background : '#fff',
        height:'100%',
        overflowY:'auto',
        overflowX:'hidden',
        paddingBottom: '50px'
      }
    }
    const content = (
      <div>
        <p>手机：<a href={'tel:' + userInfo.mobile}>{userInfo.mobile}</a></p>
        <p>邮箱：{userInfo.email}</p>
      </div>
    )
    if (userInfo && menus) {
      return (
        <Layout style={{ 'height' : '100%' }}>
          <Sider
            className='blog-layout-sider'
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            style={getSiderStyle(this.state.collapsed)}
          >
            <Popover
              title={
                <div>
                  {userInfo.nickName}
                  <Icon type={userInfo.gender ? 'man' : 'woman'} style={{ marginLeft:'5px' }} />
                </div>
              }
              placement='rightTop'
              content={content}
            >
              <div
                className={state.collapsed ? 'blog-logo-normal' : 'blog-logo-collapsed'}
                style={{ background:state.logoBackground }}>
                <Avatar src={userInfo.headPic} style={{ background:state.logoBackground }} />
                <span> About Me</span>
              </div>
            </Popover>
            <Menu
              defaultSelectedKeys={[state.currentKey]}
              onClick={handleClick}
              mode='inline'
              style={{ height:'100%' }}
            >
              {
                menus && menus.map && menus.map(function (item) {
                  return getMenuItem(item)
                })
              }
            </Menu>
          </Sider>
          <Layout style={{ background : '#fff', height:'100%' }}>
            <Content style={{ margin: '16px 0' }}>
              {/* <div id='container'>123</div> */}
              <ColCards data={cards} handleClick={routerPush} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2016 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      )
    }
    return (<Spin size='large' />)
  }
}

Blog.propTypes = {
  getUserInfo: React.PropTypes.func,
  getMenus: React.PropTypes.func
}

export default Blog
