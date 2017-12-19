import _ from 'lodash';
import './style.css';

function component () {
  let element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('red-color');

  return element;
}

document.body.appendChild(component());
