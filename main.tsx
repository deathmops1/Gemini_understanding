import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import SearchForm from './components/SearchForm'
import MovieDetail from './components/MovieDetail'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchResults from './components/SearchResults.tsx'
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/search",
    element: <SearchForm />,
  },
  {
    path: "/search-results",
    element: <SearchResults />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);