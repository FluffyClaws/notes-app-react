import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import NotesPage from "./pages/NotesPage";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <NotesPage />
      </div>
    </Provider>
  );
};

export default App;
