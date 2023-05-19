import React, { useState } from "react";
import { Input } from "../index";
import { useStoreon } from "storeon/react";

import {
  FaceSmileIcon,
  LinkIcon,
  MicrophoneIcon,
  MagnifyingGlassCircleIcon,
  EllipsisVerticalIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

export function MessagesPage({ user, id }) {
  const [message, setMessage] = useState("");
  const { dispatch } = useStoreon();
  const handleSendMessage = () => {
    dispatch("sendMessage", {
      id: id,
      message: message,
      chatId: `${user.name}@c.us`,
    });
  };
  const handleSetMessage = (value) => {
    setMessage(value);
  };

  return (
    <div className="w-2/3 bg-gray-700 flex flex-col">
      <div className="h-16 border-b-2 flex row justify-between p-2 ">
        <div className="flex row items-center gap-5">
          <UserCircleIcon className="h-12 w-12" />
          {user?.name}
        </div>
        <div className="flex row items-center gap-5">
          <MagnifyingGlassCircleIcon className="h-6 w-6" />
          <EllipsisVerticalIcon className="h-6 w-6" />
        </div>
      </div>
      <div className="flex flex-col h-5/6">
        {user.messages?.map((v, i) => {
          return (
            <div
              key={i}
              className={
                v.name === "me"
                  ? "flex bg-green-500 w-fit rounded-md p-2 self-end m-4"
                  : "flex bg-gray-500 w-fit rounded-md p-2 m-4"
              }
            >
              <p>{v.msg}</p>
            </div>
          );
        })}
      </div>
      <div className="h-16 flex row justify-between border-t-2 items-center p-4 mt-auto">
        <div className="flex row gap-5">
          <FaceSmileIcon className="h-6 w-6" />
          <LinkIcon className="h-6 w-6" />
        </div>
        <div className="w-2/3">
          <Input
            placeholder={"Введите сообщение"}
            onEnterPress={handleSendMessage}
            onChange={handleSetMessage}
          />
        </div>
        <MicrophoneIcon className="h-6 w-6" />
      </div>
    </div>
  );
}
