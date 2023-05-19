import React, { useState } from "react";
import { Input } from "../index";
import { useStoreon } from "storeon/react";

export function LoginForm() {
  const { dispatch } = useStoreon("state");
  const [idInstance, setIdInstance] = useState();
  const [apiTokenInstance, setApiTokenInstance] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch("setCredentials", { idInstance, apiTokenInstance });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/3 h-1/3 bg-gray-700 rounded-lg flex flex-col justify-center align-middle items-center gap-5 p-4 m-auto"
    >
      <Input
        required
        placeholder={"Введите idInstance"}
        onChange={setIdInstance}
      />
      <Input
        required
        placeholder={"Введите apiTokenInstance"}
        onChange={setApiTokenInstance}
      />
      <button type="submit" className=" bg-green-500 rounded-lg p-2 ">
        Войти
      </button>
    </form>
  );
}
