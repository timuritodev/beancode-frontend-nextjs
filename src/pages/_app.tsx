import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../services/redux/store';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout/Layout';
import '../../public/fonts/fonts.css';
import '../../public/normalize.css';
import '../globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
