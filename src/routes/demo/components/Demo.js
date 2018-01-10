import React from 'react';
import './Demo.less';

//import waterFall from '../assets/Demo'

class Demo extends React.Component {
  componentDidMount () {
  }

  render () {
    const style = {
      verticalAlign: 'middle',
      display: 'table-cell'
    };
    return <div style={{
      display: 'table',
      verticalAlign: 'middle',
      textAlign: 'center',
      width: '100%',
      height: '100%'
    }}>
      <div id='cell' style={style}>
        <div style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#000',
          color:'#fff',
          display: 'inline-block'
        }}>demo
        </div>
      </div>
    </div>;
  }
}

export default Demo;
