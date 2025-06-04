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
import AuthLayout from "./components/AuthLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "/login",
        element: (
          <AuthLayout isProtected={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout isProtected={false}>
            <SignupPage />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout isProtected={false}>
            {""}
            <AllPost />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout isProtected>
            {""}
            <AddForm />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout isProtected>
            {""}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
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
