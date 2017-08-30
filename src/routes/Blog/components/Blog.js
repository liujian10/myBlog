import React from 'react'
import { Layout, Menu, Row, Col, Card, Icon, Avatar, Popover } from 'antd'
import './Blog.less'
import { fetchUserInfo, fetchMenus } from '../../../util/fetchRequest'
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
    console.log(path)
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
      logoBackground:'#fff',
      userInfo:{
        userName: '',
        nickName: '',
        gender: 1,
        headPic: 'http://i0.img.cp21.ott.cibntv.net/lc07_iscms/201704/24/17/09/3d91c0228e924d3bbfe61f978955e663.png',
        eMail:'',
        mobile:''
      },
      menuData:[],
      cardData:[]
    }
  }
  componentWillMount () {
    fetchUserInfo('user001').then(res => {
      this.setState({ userInfo : res })
    })
    fetchMenus().then(res => {
      let menus = res.menus
      this.setState({ menuData : menus })
      let cards = []
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
      this.setState({ cardData : cards })
    })
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed })
  }
  render () {
    const { props, state } = this
    const routerPush = (path) => {
      props.router.push(path)
    }
    const handleClick = (e) => {
      console.log(e)
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
        <p>手机：<a href={'tel:' + this.state.userInfo.mobile}>{this.state.userInfo.mobile}</a></p>
        <p>邮箱：{this.state.userInfo.email}</p>
      </div>
    )
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
                {this.state.userInfo.nickName}
                <Icon type={this.state.userInfo.gender ? 'man' : 'woman'} style={{ marginLeft:'5px' }} />
              </div>
            }
            placement='rightTop'
            content={content}
          >
            <div
              className={state.collapsed ? 'blog-logo-normal' : 'blog-logo-collapsed'}
              style={{ background:state.logoBackground }}>
              <Avatar src={state.userInfo.headPic} style={{ background:state.logoBackground }} />
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
              this.state.menuData.map(function (item) {
                return getMenuItem(item)
              })
            }
          </Menu>
        </Sider>
        <Layout style={{ background : '#fff', height:'100%' }}>
          <Content style={{ margin: '16px 0' }}>
            <ColCards data={this.state.cardData} handleClick={routerPush} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Blog
