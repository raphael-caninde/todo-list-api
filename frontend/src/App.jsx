import { Router } from './routes/Routes';
import AppProvider from './context/AppProvider';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Router />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
