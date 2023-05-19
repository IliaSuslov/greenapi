import "./App.css";
import { SideMenu, MainMenu, MessagesPage, LoginForm } from "./components";
import { useState } from "react";
import { useStoreon } from "storeon/react";

function App() {
  const { dispatch, appState } = useStoreon("appState");
  const [selectedUser, selectUser] = useState();
  const handleCreateNewChatWithUser = (phone) => {
    dispatch("setNewChat", {
      name: phone,
    });
  };
  const handleUserSelect = (index) => {
    selectUser(index + 1);
  };

  if (!appState?.isLoggedIn)
    return (
      <div className="h-screen flex justify-center">
        <LoginForm />
      </div>
    );
  return (
    <div className="App">
      <SideMenu
        users={appState.users}
        onEnterPress={handleCreateNewChatWithUser}
        onUserSelect={handleUserSelect}
      />
      {selectedUser ? (
        <MessagesPage
          user={appState.users?.[selectedUser - 1]}
          id={selectedUser - 1}
        />
      ) : (
        <MainMenu />
      )}
    </div>
  );
}

export default App;
