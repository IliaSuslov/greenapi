import { createStoreon } from "storeon";
import { storeonDevtools } from "storeon/devtools";
import moment from "moment";

let intervalId;

function debounce(ms) {
  setTimeout(function () {
    intervalId = setInterval(() => {
      store.dispatch("getMessages");
    }, ms);
  }, 5000);
}

const initialState = {
  idInstance: localStorage.getItem("idInstance"),
  apiTokenInstance: localStorage.getItem("apiTokenInstance"),
  users: [],
  isLoggedIn:
    localStorage.getItem("idInstance") &&
    localStorage.getItem("apiTokenInstance")
      ? true
      : false,
};

let state = (store) => {
  store.on("@init", () => ({ appState: initialState }));
  store.on("setMessage", ({ appState }, payload) => {
    if (
      payload.body?.messageData?.textMessageData?.textMessage &&
      payload.body?.senderData?.sender === appState.chatId
    ) {
      store.dispatch("deleteMessage", payload.receiptId);
      appState.users[0].messages.push({
        name: "not me",
        msg: payload.body.messageData.textMessageData.textMessage,
      });
    } else {
      store.dispatch("deleteMessage", payload.receiptId);
    }
    return { appState: { ...appState } };
  });
  store.on("setNewChat", ({ appState }, data) => {
    return {
      appState: {
        ...appState,
        chatId: `${data.name}@c.us`,
        users: [
          ...appState.users,
          {
            ...data,
            messages: [],
            lastMsgDate: moment().format("YYYY-MM-DD"),
            lastMsg: "",
          },
        ],
      },
    };
  });
  store.on(
    "setCredentials",
    ({ appState }, { idInstance, apiTokenInstance }) => {
      localStorage.setItem("idInstance", idInstance);
      localStorage.setItem("apiTokenInstance", apiTokenInstance);
      return {
        appState: {
          ...appState,
          idInstance: idInstance,
          apiTokenInstance: apiTokenInstance,
          isLoggedIn: true,
        },
      };
    }
  );
  store.on("sendMessage", ({ appState }, { id, message, chatId }) => {
    fetch(
      `https://api.green-api.com/waInstance${appState.idInstance}/sendMessage/${appState.apiTokenInstance}`,
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          message,
          chatId,
        }),
      }
    );
    debounce(500);
    appState.users[id] = {
      ...appState.users[id],
      lastMsg: message,
      lastMsgDate: moment().format("YYYY-MM-DD"),
      messages: [
        ...appState.users[id].messages,
        {
          name: "me",
          msg: message,
        },
      ],
    };
    return { appState: { ...appState } };
  });
  store.on("getMessages", ({ appState }) => {
    fetch(
      `https://api.green-api.com/waInstance${appState.idInstance}/receiveNotification/${appState.apiTokenInstance}`,
      {
        method: "GET",
        redirect: "follow",
      }
    )
      .then((res) => res.json())
      .then((res) => store.dispatch("setMessage", res))
      .catch((err) => {
        clearInterval(intervalId);
      });
  });
  store.on("deleteMessage", ({ appState }, id) => {
    fetch(
      `https://api.green-api.com/waInstance${appState.idInstance}/deleteNotification/${appState.apiTokenInstance}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  });
};

export const store = createStoreon([
  state,
  process.env.NODE_ENV !== "production" && storeonDevtools,
]);
