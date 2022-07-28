import Routes from './routes/Routes';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
