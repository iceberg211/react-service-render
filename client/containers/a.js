import React from "react";

export default function Home() {
  const handlerClick = () => {
    alert("一起来玩 react ssr 啊");
  };

  return (
    <div onClick={handlerClick}>
      主页面
    </div>);
}
