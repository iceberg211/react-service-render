import React from 'react';

export default (SourceComponent) => {
  return class HoComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        initialData: {},
        getProps: false//浏览器端是否需要请求数据
      }
    }
    //用于服务端调用
    static async getInitialProps(props) {
      return SourceComponent.getInitialProps ? await SourceComponent.getInitialProps(props) : {};
    }


    async componentDidMount() {

      if (!this.state.initialData || !this.state.initialData.fetchData) {
        HoComponent.getInitialProps().then(res => {
          //...渲染数据
        })
      }
    }

    render() {
      const props = {
        initialData: {},
        ...this.props
      };

      if (__SERVER__) {
        //服务端渲染
        props.initialData = this.props.staticContext.initialData || {};
      } else {
        //客户端渲染 props.initialData=this.props.initialData;
      }


      return <SourceComponent  {...props}></SourceComponent>
    }
  }
}
