import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import './styles/index.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div className="min-h-screen bg-casino-dark overflow-x-hidden">
            <AppRouter />
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;