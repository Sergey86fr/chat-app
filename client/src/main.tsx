import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './components/layout/layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ChatPage from "./pages/chat-page/chat-page.tsx";
import LoginPage from "./pages/login-page/login-page.tsx";
import RegisterPage from "./pages/register-page/register-page.tsx";
import ProtectedRoute from "./components/protected-route/protected-route.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";





const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/",
                        element:<ChatPage />
                    }
                ]
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/register",
                element: <RegisterPage />
            }
        ]
    },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      </QueryClientProvider>
  </StrictMode>,
)
