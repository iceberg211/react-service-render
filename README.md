# react 服务端渲染

### react SSR 的核心原理

- 客户端渲染(Client Side Rendering)

  它是目前 Web 应用中主流的渲染模式，一般由 Server 端返回初始 HTML 内容，然后再由 JS 去异步加载数据，再完成页面的渲染。这种模式下服务端只会返回一个页面的框架和 js 脚本资源，而不会返回具体的数据。

- ssr(Server Side Rendering)

  传统网站 jsp,php 页面直出,这种页面（html）直出的方式可以让页面首屏较快的展现给用户，对搜索引擎比较友好，爬虫可以方便的找到页面的内容，非常有利于 SEO。

  不好的地方就是所有页面的加载都需要向服务器请求完整的页面内容和资源，访问量较大的时候会对服务器造成一定的压力，另外页面之间频繁刷新跳转的体验并不是很友好。

* 同构：

  同构这个概念存在于 Vue，React 这些新型的前端框架中，同构实际上是客户端渲染和服务器端渲染的一个整合。我们把页面的展示内容和交互写在一起，让代码执行两次。在服务器端执行一次，用于实现服务器端渲染，在客户端再执行一次，用于接管页面交互。

同构的最大优点是双端可以公用一套代码，但它是一把双刃剑，因为他还涉及到服务端，所以复杂性大大增加。

另外双端也不是完全能公用一套代码，还需要做很多差异化的处理。不只是代码层面的，还会涉及到架构和工程化。

SSR 之所以能够实现，本质上是因为虚拟 DOM 的存在。

React 框架中的虚拟 DOM，虚拟 DOM 是真实 DOM 的一个 JavaScript 对象映射，React 在做页面操作时，实际上不是直接操作 DOM，而是操作虚拟 DOM，也就是操作普通的 JavaScript 对象，这就使得 SSR 成为了可能。在服务器，我可以操作 JavaScript 对象，判断环境是服务器环境，我们把虚拟 DOM 映射成字符串输出；在客户端，我也可以操作 JavaScript 对象，判断环境是客户端环境，我就直接将虚拟 DOM 映射成真实 DOM，完成页面挂载。

其他的一些框架，比如 Vue，它能够实现 SSR 也是因为引入了和 React 中一样的虚拟 DOM 技术。

例如

```

<ul id='list'>
  <li class='item'>1</li>
  <li class='item'>2</li>
  <li class='item'>3</li>
</ul>

```

上面的结构可以转换为下面的对象表示（虚拟 dom）

```

const tree = {
  tag: 'ul', // 节点标签名
  props: { // DOM 的属性，用一个对象存储键值对
  id: 'list'
  },
  children: [ // 该节点的子节点
    {tag: 'li', props: {class: 'item'}, children: ['1']},
    {tag: 'li', props: {class: 'item'}, children: ['2']},
    {tag: 'li', props: {class: 'item'}, children: ['3']},
  ]
}

```

从上面我们可以看出这就是个普通对象。

既然有了这样的对象，我们就可以轻松的把这个对象转换我们想要的表现形式，比如 html 格式，而这个 html 就是我们要直出的内容。

不过这个转换的过程不需要我们来完成，react 已经帮我们完成，其本身就已提供了内置方法来支持服务端渲染。

`ReactDOMServer.renderToString(element)`

将 React 元素渲染为初始 HTML。React 将返回一个 HTML 字符串。你可以使用此方法在服务端生成 HTML，并在首次请求时将标记下发，以加快页面加载速度，并允许搜索引擎爬取你的页面以达到 SEO 优化的目的。

如果你在已有服务端渲染标记的节点上调用 ReactDOM.hydrate() 方法，React 将会保留该节点且只进行事件处理绑定，从而让你有一个非常高性能的首次加载体验。

浏览器也执行一次代码，组件不会重复渲染吗？

浏览器接管页面后，react-dom 在渲染组件前会先和页面中的节点做对比，只有对比失败的时候才会采用客户端的内容进行渲染,且 react 会尽量多的复用已有的节点。

`hydrate()`
hydrate 描述的是 ReactDOM 复用 ReactDOMServer 服务端渲染的内容时尽可能保留结构，并补充事件绑定等 Client 特有内容的过程。

React 希望服务端与客户端渲染的内容完全一致。React 可以弥补文本内容的差异，但是你需要将不匹配的地方作为 bug 进行修复。在开发者模式下，React 会对 hydration 操作过程中的不匹配进行警告。但并不能保证在不匹配的情况下，修补属性的差异。由于性能的关系，这一点非常重要，因为大多是应用中不匹配的情况很少见，并且验证所有标记的成本非常昂贵。

如果单个元素的属性或者文本内容，在服务端和客户端之间有无法避免差异（比如：时间戳），则可以为元素添加 suppressHydrationWarning={true} 来消除警告。这种方式只在一级深度上有效，应只作为一种应急方案（escape hatch）。请不要过度使用！除非它是文本内容，否则 React 仍不会尝试修补差异，因此在未来的更新之前，仍会保持不一致。

### 路由同构

```
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </Provider>
  );
};


ReactDom.render(<App/>, document.querySelector('#root'))

```

客户端路由代码非常简单，大家一定很熟悉，BrowserRouter 会自动从浏览器地址中，匹配对应的路由组件显示出来。

```

const App = () => {
return
<Provider store={store}>
<StaticRouter location={req.path} context={context}>
<div>
<Route path='/' component={Home}>
</div>
</StaticRouter>
</Provider>
}
Return ReactDom.renderToString(<App/>)

```

服务器端路由代码相对要复杂一点，需要你把 location（当前请求路径）传递给 StaticRouter 组件，这样 StaticRouter 才能根据路径分析出当前所需要的组件是谁。（PS：StaticRouter 是 React-Router 针对服务器端渲染专门提供的一个路由组件。）

```
 <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        {renderRoutes(routes)}
      </StaticRouter>
 </Provider>

```
