import { Provider } from 'react-redux';
import Routes from 'components/app/routes/Routes';
import { store, persistor } from 'store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { config } from 'config/index';

const { googleClientId } = config;

const App = () => {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default App;
