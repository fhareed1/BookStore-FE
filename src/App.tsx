import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Toast from "./components/ui/toast";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
        <Toast />
      </BrowserRouter>
    </>
  );
}

export default App;
