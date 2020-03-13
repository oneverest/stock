import React from 'react';
import { hydrate } from 'react-dom';
import configureStore from '../shared/store';
import App from '../shared/App';
import { Provider } from 'react-redux';
import './_assets';
// import moment from 'moment';
// import 'moment/locale/zh-cn';

// moment.locale('zh-cn');

// console.log(
//   moment()
//     .endOf('day')
//     .fromNow(),
// );

const store =
  window.store ||
  configureStore({
    initialState: window.__PRELOADED_STATE__,
  });

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);

/*eslint @typescript-eslint/no-explicit-any:off */
if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept();
  }

  if (!window.store) {
    window.store = store;
  }
}
