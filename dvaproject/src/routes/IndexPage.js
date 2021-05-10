import React, { useEffect, useRef } from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { createElement } from 'basic-ts-components';

function IndexPage() {
  const ceshiRef = useRef(null);
  useEffect(() => {
    const customElement = createElement('h1');
    customElement.textContent = 'nihao';
    ceshiRef.current.appendChild(customElement);
  }, [])
  return (
    <div className={styles.normal}>
      <div ref={ceshiRef}></div>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
