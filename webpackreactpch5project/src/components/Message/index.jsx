import styles from './index.less';

let messageDom;

let messageTextDom;

let timeoutId;

export function showMessage(msg, million = 3000) {
  if (timeoutId != null) {
    clearTimeout(timeoutId);
  }
  if (!messageDom) {
    messageDom = document.createElement('div');
    messageDom.classList.add(styles.messageContainer);
    messageTextDom = document.createElement('span');
    let img = document.createElement('img');
    img.src = 'http://image.xingqinghao.com/img/xqh.png';
    img.classList.add(styles.imgContainer);
    messageTextDom.textContent = msg;
    messageDom.appendChild(img);
    messageDom.appendChild(messageTextDom);
    document.body.appendChild(messageDom);
    timeoutId = setTimeout(() => {
      messageDom.style.display = 'none';
    }, million);
    return;
  }
  messageTextDom.textContent = msg;
  messageDom.style.display = 'flex';
  timeoutId = setTimeout(() => {
    messageDom.style.display = 'none';
  }, million);
}