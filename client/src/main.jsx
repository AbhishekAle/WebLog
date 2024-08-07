import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store.js";
import { Provider } from "react-redux";
import Modal from "react-modal";
import { FirebaseProvider } from "./context/firebase.jsx";

Modal.setAppElement("#root");
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </PersistGate>
  </Provider>
);
