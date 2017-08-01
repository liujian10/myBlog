import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import MapleImage from '../assets/maple.png'
import {Link} from 'react-router'
import {Layout, Card, Row, Col} from 'antd'
import './HomeView.less'

const {Header, Content} = Layout;

const RowCol = (data)=> {
  let info = data.info;
  return <Col span={4}>
    <Link to={info.link} activeClassName='page-content-row'>
      <Card className='page-content-row-card'>
        <div>
          <img src={info.img}/>
        </div>
        <div className="page-content-row-card-desc">
          <h3>{info.title}</h3>
          <p>{info.desc}</p>
        </div>
      </Card>
    </Link>
  </Col>
}

export const HomeView = () => (
   <Layout className="page-layout">
     <Header className="page-header">
       <h1 className="page-header-title">Hello</h1>
     </Header>
     <Content className="page-content">
       <Row className="page-content-row" type="flex" align="middle" justify="space-around" gutter={24}>
         <RowCol info={{link:'/counter',img:DuckImage,title:'Counter',desc:'To demo counter'}}/>
         <RowCol info={{link:'/blog',img:MapleImage,title:'My blog',desc:'To my blog'}}/>
         <RowCol info={{link:'/cashier',img:'http://i0.letvimg.com/lc07_pay/201704/18/12/22/levip-logo.png',title:'Cashier',desc:'To tv cashier'}}/>
       </Row>
     </Content>
   </Layout>
)

export default HomeView
