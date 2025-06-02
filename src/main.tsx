import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./state/store.ts"; // path to your store file
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.tsx";
import {
  LoginPage,
  SignupPage,
  AllPost,
  EditPost,
  Post,
  AddForm,
  HomePage,
} from "./Pages";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
