import React from "react";
import Layout from './compoents/sider';
import { renderRoutes } from "react-router-config";


const App = (props) => {
  return (
    <Layout>
      {renderRoutes(props.route.routes)}
    </Layout>
  );
};


App.getInitialProps = async (store, req, res) => {
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

  return result;
}

export default App;
