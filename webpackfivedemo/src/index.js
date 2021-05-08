import style from './style.css';
import ReactDOM from 'react-dom';
import React from 'react';

class A {

  static b = 5;

  constructor() {

    this.a = 3;
  }
}

function getComponent() {
  // const element = document.createElement('div');
  // const btn = document.createElement('button');

  // // lodash 现在通过一个 script 引入
  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  // element.classList.add('hello');
  // const myIcon = new Image();
  // myIcon.src = Icon;
  // element.appendChild(myIcon);

  // btn.innerHTML = 'Click me and check the console!';
  // btn.onclick = printMe;

  // element.appendChild(btn);
  // return element;
  const ni = document.createElement('button');
  ni.onclick = function() {
    import('./print').then(({default: print}) => print())
  }
  console.log(style.hello);
  document.body.appendChild(ni);
  return import('lodash').then(({ default: _ }) => {
    const element = document.createElement('div');
    element.innerHTML = _.join(['hello', 'webpack'], '');
    console.log('nihao');
    ReactDOM.render(React.createElement('span', {
      
    }), element);
    return element;
  }).catch(error => 'An error occurred while loading the component');
}

getComponent().then((component) => {
  document.body.appendChild(component);
});