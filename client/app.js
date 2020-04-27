import React from "react";
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import styles from "./app.styl";
import D from './containers/d';

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
}];

const App = (props) => {
  return (
    <div>
      <Helmet>
        <title>这是一个react 同构的demo</title>
        <meta name="description" content="这是一个react 同构的demo" />
      </Helmet>
      <header>
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">ssr demo</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link to="/">首页</Link>
              </li>
              <li>
                <Link to="b">Sass</Link>
              </li>
              <li>
                <Link to="/c">Components</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <div className="row" style={{ height: '80vh' }}>
        <div className="col s12 m6">
          <div className="card blue-grey">
            <div className="card-content white-text">
              <span className="card-title">页面</span>
              {renderRoutes(props.route.routes)}
            </div>
          </div>
        </div>
      </div>
      <D />
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Footer Content</h5>
              <p className="grey-text text-lighten-4">
                You can use rows and columns here to organize your footer content.
            </p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Links</h5>
              <ul>
                <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © 2020 Copyright Text
          <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
          </div>
        </div>
      </footer>
    </div>
  );
};


App.getInitialProps = async (store, req, res) => {
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

  return result;
}

export default App;
