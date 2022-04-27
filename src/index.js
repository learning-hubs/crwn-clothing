import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js';

import './index.scss';
import App from './App';

// import { CartProvider } from './context/cart.context';
import {store, persistor} from './store/store';
import { stripePromise } from './utils/stripe/stripe.utils';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
              {/* <CartProvider> */}
              <Elements stripe={stripePromise}>
                  <App />
              </Elements>
              {/* </CartProvider> */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
