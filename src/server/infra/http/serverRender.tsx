import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import Html from './Html';
import { assetPath } from 'express-manifest-helpers';
import configureStore from '../../../shared/store';
import App from '../../../shared/App';

const serverRenderer = () => (_req: express.Request, res: express.Response) => {
  const store = configureStore({});
  const content = renderToString(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  res.locals.store = store;
  res.send(
    renderToString(
      <Html
        css={[assetPath('bundle.css'), assetPath('vendor.css')]}
        scripts={[assetPath('bundle.js'), assetPath('vendor.js')]}
        state={JSON.stringify(store.getState())}
      >
        {content}
      </Html>,
    ),
  );
};

export { serverRenderer };
