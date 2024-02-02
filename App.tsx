import { Routes, Route } from "react-router-dom";
import SearchResults from "./components/SearchResults";
import SearchForm from "./components/SearchForm";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<SearchForm />} />
          <Route path="/search-results" element={<SearchResults />} />
        </Routes>
    </QueryClientProvider>
  );
};

export default App;
