import React from "react";
import {
  UserCircleIcon,
  UserGroupIcon,
  ArrowPathIcon,
  ChatBubbleBottomCenterIcon,
  EllipsisVerticalIcon,
  FunnelIcon,
} from "@heroicons/react/24/solid";
import { clearLocalStore } from "../../helpers/functions";
import { Input } from "../index";

export function SideMenu({ users, onEnterPress, onUserSetlect }) {
  return (
    <div className="w-1/3 bg-gray-700 border-r">
      <div className="bg-gray-500 flex justify-between items-center p-2">
        <UserCircleIcon className="h-12 w-12 rounded-3xl" />
        <div className="flex gap-5">
          <UserGroupIcon className="h-6 w-6" />
          <ArrowPathIcon className="h-6 w-6" />
          <ChatBubbleBottomCenterIcon className="h-6 w-6" />
          <EllipsisVerticalIcon className="h-6 w-6" />
        </div>
      </div>
      <div className="flex gap-5 p-2 items-center justify-center">
        <button
          className=" bg-green-500 rounded-lg p-2 "
          onClick={clearLocalStore}
        >
          Clear localstore
        </button>
      </div>
      <div className="flex gap-5 p-2 items-center">
        <Input placeholder="Поиск или новый чат" onEnterPress={onEnterPress} />
        <FunnelIcon className="h-6 w-6" />
      </div>
      {users.map(({ name, lastMsgDate, lastMsg }, i) => {
        return (
          <div
            key={i}
            onClick={() => onUserSetlect(i)}
            className="flex items-center gap-4 p-2 bg-gray-700 hover:bg-sky-700 active:bg-sky-700 border-b"
          >
            <UserCircleIcon className="h-12 w-12" />
            <div className="w-10/12 flex flex-col gap-2">
              <div className="flex justify-between">
                <p>{name}</p>
                <p>{lastMsgDate}</p>
              </div>
              <p className="w-full truncate">{lastMsg}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
