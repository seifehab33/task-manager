import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./Layout/MainLayout";
import { Provider } from "react-redux";
import store from "./store/app";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <MainLayout />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
