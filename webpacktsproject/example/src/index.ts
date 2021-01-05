import { LineItem } from './LineItem';
import { DragSource } from './DragSource/index';
(function () {
  const root = document.getElementById('root');
  const dragSource = new DragSource({
    datas: [{
      id: 1,
      name: 'liu',
      describe: 'nihao',
      avator: 'https://img.alicdn.com/tps/TB1TJtmOVXXXXXcaXXXXXXXXXXX-171-173.png'
    }, {
      id: 2,
      name: 'hao',
      describe: 'nihao',
      avator: 'https://img.alicdn.com/tps/TB1TJtmOVXXXXXcaXXXXXXXXXXX-171-173.png'
    }, {
      id: 3,
      name: 'zhi',
      describe: 'nihao',
      avator: 'https://img.alicdn.com/tps/TB1TJtmOVXXXXXcaXXXXXXXXXXX-171-173.png'
    }, {
      id: 4,
      name: 'long',
      describe: 'nihao',
      avator: 'https://img.alicdn.com/tps/TB1TJtmOVXXXXXcaXXXXXXXXXXX-171-173.png'
    }, {
      id: 5,
      name: 'yan',
      describe: 'nihao',
      avator: 'https://img.alicdn.com/tps/TB1TJtmOVXXXXXcaXXXXXXXXXXX-171-173.png'
    }, {
      id: 6,
      name: 'jun',
      describe: 'nihao',
      avator: 'https://img.alicdn.com/tps/TB1TJtmOVXXXXXcaXXXXXXXXXXX-171-173.png'
    }, {
      id: 7,
      name: 'qiu',
      describe: 'nihao',
      avator: 'https://img.alicdn.com/tps/TB1TJtmOVXXXXXcaXXXXXXXXXXX-171-173.png'
    }],
    domParent: root
  });
  dragSource.requestRender();
})();
