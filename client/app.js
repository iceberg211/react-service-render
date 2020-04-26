import { hot } from "react-hot-loader/root";
import React from "react";
import { Helmet } from 'react-helmet';
import { renderRoutes } from "react-router-config";
import styles from "./app.styl";

const App = (props) => {
  console.log(props)
  return (
    <div className={styles.box}>
      <Helmet>
        <title>这是一个react 同构的demo</title>
        <meta name="description" content="这是一个react 同构的demo" />
      </Helmet>
      <header>header</header>
      {renderRoutes(props.route.routes)}
      <header onClick={() => console.log("console")}>header</header>
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
          data: [],
        })
      }, 100);
    })
  }

  let result = await fetchData();

  console.log('getInitialProps', result)
  return result;
}

export default hot(App);
