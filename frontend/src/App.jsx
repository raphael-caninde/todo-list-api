import { Router } from './routes/Routes';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

export default App;
