import { Router } from './routes/Routes';
import AppProvider from './context/AppProvider';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

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
        <ToastContainer />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
