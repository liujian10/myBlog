import './Footer.less';

import React from 'react';
import { Layout, Divider } from 'antd';
import { project } from '../../static/data/config';

const { Footer } = Layout;

const HomeFooter = () => {
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

  return (
    <Footer className='home-footer'>
      <div>
        <Divider dashed>Support</Divider>
        {getSupports()}
      </div>
      <div>
        Created by <a href={gitHub}>{author}</a> 2017
      </div>
    </Footer>
  );
};

export default HomeFooter;
