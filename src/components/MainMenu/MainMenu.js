import React from "react";
import logo from "../../logo.svg";

export function MainMenu() {
  return (
    <div className="w-2/3 bg-gray-700 flex text-center items-center justify-center border-b-4 border-green-400">
      <div>
        <img src={logo} alt="logo" />
        <h1>React-WhatsApp Web</h1>
        <div>
          Отправляйте и получайте сообщения без необходимости оставлять телефон
          <br />
          подключённым.
          <br />
          Используйте WhatsApp одновременно на четырёх связанных устройствах
          <br />и одном телефоне.
        </div>
      </div>
    </div>
  );
}
