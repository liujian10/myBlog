import './Footer.less';

import React from 'react';
import { Layout, Divider, Icon } from 'antd';

const { Footer } = Layout;

const HomeFooter = () => {
  const project = {
    'author': 'Maple Liu',
    'gitHub': 'https://github.com/liujian10/myBlog',
    'support': {
      'Ant Design': 'https://ant.design/index-cn',
      'Ant Motion': 'https://motion.ant.design/',
      'React Redux Starter Kit': 'https://github.com/davezuko/react-redux-starter-kit'
    }
  };

  const { author = '', gitHub = '', support = [] } = project;

  const getSupports = () => {
    const supports = [];
    let supportKey = 0;
    for (let key in support) {
      supports.push(<a key={++supportKey} href={support[key]}>{key}</a>);
      supports.push(<Divider key={++supportKey} type='vertical'/>);
    }
    return supports.slice(0, supports.length - 1);
  };

  const footerStyle = {
    width: '100%',
    margin: '20px 0',
    backgroundColor: 'inherit',
    textAlign: 'center'
  };

  return (
    <Footer style={footerStyle}>
      <Divider dashed><Icon type='link'/></Divider>
      <div>
        {getSupports()}
        <Divider type='vertical'/>
        <a href={gitHub}><Icon type='github'/></a>
      </div>
    </Footer>
  );
};

export default HomeFooter;
