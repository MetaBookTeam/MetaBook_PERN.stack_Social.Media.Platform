import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Service/redux/store.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="1066961121397-6r8df06qadtv67v9al89674nf4qphno8.apps.googleusercontent.com">
  <Provider store={store}>
    <App />
  </Provider>
  </GoogleOAuthProvider>
);
