import { hot } from "react-hot-loader/root";
import React from "react";
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import styles from "./app.styl";

const data = [{
  "title": "深入浅出TypeScript：从基础知识到类型编程",
  "desc": "Vue3 源码及开发必备基础，从基础知识到类型工具设计，从理论到实战，手把手让你从零基础成为进阶使用者。",
  "img": "https://user-gold-cdn.xitu.io/2019/11/8/16e4ab5d6aff406a?imageView2/1/w/200/h/280/q/95/format/webp/interlace/1"
}, {
  "title": "SVG 动画开发实战手册",
  "desc": "从0到1，学习SVG动画开发知识，快速高效完成SVG动画效果开发。",
  "img": "https://user-gold-cdn.xitu.io/2019/9/26/16d6bda264ac27e4?imageView2/1/w/200/h/280/q/95/format/webp/interlace/1"
}, {
  "title": "预售JavaScript 设计模式核⼼原理与应⽤实践",
  "desc": "通俗易懂的编程“套路“学。带你深入看似高深实则接地气的设计模式原理，在实际场景中内化设计模式的”道“与”术“。学会驾驭代码，而非被其奴役。",
  "img": "https://user-gold-cdn.xitu.io/2019/9/16/16d382e623923d91?imageView2/1/w/200/h/280/q/95/format/webp/interlace/1"
}
]

const App = (props) => {
  return (
    <div>
      <Helmet>
        <title>这是一个react 同构的demo</title>
        <meta name="description" content="这是一个react 同构的demo" />
      </Helmet>
      <header className={styles.header}>
        <ul>
          <li>
            <Link to="/">a</Link>
          </li>
          <li>
            <Link to="/b">b</Link>
          </li>
          <li>
            <Link to="/c">c</Link>
          </li>
        </ul>

      </header>
      <div className={styles.box}>
        {renderRoutes(props.route.routes)}
      </div>
      <footer className={styles.footer} onClick={() => console.log("console")}>footer</footer>
    </div>
  );
};


App.getInitialProps = async ({ store, req, res }) => {
  //模拟数据请求方法
  const fetchData = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          code: 0,
          data,
        })
      }, 100);
    })
  }

  let result = await fetchData();

  console.log('getInitialPropsgetInitialPropsgetInitialPropsgetInitialProps', result)
  return result;
}

export default hot(App);
