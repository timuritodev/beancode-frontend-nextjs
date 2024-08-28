import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../services/redux/store';
import Layout from '@/components/Layout/Layout';
import '../../public/fonts/fonts.css';
import '../../public/normalize.css';
import '../globals.scss';

// Обратите внимание на добавление <html> и <body> тегов
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru"> {/* Убедитесь, что язык указан правильно */}
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Layout>
              {children}
            </Layout>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
