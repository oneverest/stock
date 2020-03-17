import express, { NextFunction } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { isProduction, clsName } from '../../config';
import { createNamespace } from 'cls-hooked';
import promiseRouter from 'express-promise-router';
import session from 'express-session';
import cookieParser from 'cookie-parser';
// import { loginUseCase } from '../../modules/users/useCases/login';
import paths from '../../../../config/paths';
import path from 'path';
import manifestHelper from 'express-manifest-helpers';
import chalk from 'chalk';
import { serverRenderer } from './serverRender';
import { v1Router } from './api/v1';
import { pathToRegexp } from 'path-to-regexp';
import moment from 'moment';
// import 'moment/locale/zh-cn';
import uuid from 'uuid/v4';
import { createUserController } from 'modules/users/useCases/createUser';
import { createClient } from 'redis';
import connectRedis from 'connect-redis';

moment.locale('zh-cn');
const RedisStore = connectRedis(session);
const app = express();
const router = promiseRouter();

require('dotenv').config();
const PORT = process.env.PORT || 3800;
const origin = {
  origin: isProduction ? 'https://whitelabel.com' : '*',
};
if (process.env.NODE_ENV === 'development') {
  app.use(paths.publicPath, express.static(path.join(paths.clientBuild, paths.publicPath)));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(origin));
app.use(compression());
app.use(helmet());
app.use(morgan('combined'));

app.use(
  manifestHelper({
    manifestPath: `${path.join(paths.clientBuild, paths.publicPath, 'manifest.json')}`,
  }),
);

// create per request scope context

app.use((req, res, next) => {
  const ns = createNamespace(clsName);
  ns.bindEmitter(req);
  ns.bindEmitter(res);
  ns.run(() => {
    next();
  });
});

app.use(cookieParser());

app.use(
  session({
    name: 'sid',
    cookie: {
      // path: '/',
      // httpOnly: true,
      secure: false,
      maxAge: 6000000,
    },
    saveUninitialized: true,
    resave: false,
    genid: () => {
      return uuid();
    },
    secret: 'Jessie Xie',
    store: new RedisStore({ client: createClient() }),
  }),
);

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.sid && req.session && !req.session.user) {
    res.clearCookie('sid');
  }
  next();
});

//test for pug
// router.use('/home', (_req, res) => {
//   const locals = {
//     name: 'tom',
//     title: 'pug title',
//   };
//   res.send(fn(locals));
// });
const sessionChecker = (req: express.Request, res: express.Response, next: NextFunction) => {
  // if (req.url === '/user/login') {
  if (req.url === '/user/login' || req.url.startsWith('/pov')) {
    return next();
  }
  if (req.session && req.session.user) {
    return next();
  }
  res.status(403).send({ message: '未登录' });
};
router.use('/api/v1', sessionChecker, v1Router);
app.use('/', router);

app.post('/checkLogin', sessionChecker, (req, res) => {
  if (req.session && req.session.user) {
    const { user } = req.session;
    return res.status(200).send(user);
  }

  return res.status(403).send({ message: '尚未登录' });
});

app.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).send(err.message);
      }
      return res.status(200).send('logout success');
    });
  }
});

app.post('/register', (req, res) => createUserController.execute(req, res));

// router.get('/', sessionChecker, (_req, res) => {
//   res.redirect('/login');
//   // res.send({ name: 'jessie' });
// });

// router.route('/signup').get(sessionChecker, (req, res) => {
// });

// router
//   .route('/login')
//   .get(sessionChecker, (_req, res) => {
//     res.render('site/login');
//   })
//   .post(async (req, res) => {
//     const result = await loginUseCase.execute(req.body);
//     if (result.isRight()) {
//       const user = result.value.getValue();
//       if (req.session) req.session.user = user;
//       res.redirect('/dashboard');
//     } else {
//       result.value.error;
//     }
//   });

// New api versions can go here

app.use((req, res, next) => {
  console.log('req_url', req.url);
  if (pathToRegexp('/', [], { end: true }).test(req.url)) {
    next();
  } else {
    res.redirect('/');
  }
}, serverRenderer());

// 404
// app.use((_req, res) => {
//   res.status(404).send('sorry, page not found');
// });

app.listen(PORT, () => {
  console.log(`[${new Date().toLocaleString()}]`, chalk.blue(`App is running: http://localhost:${PORT}`));
});

export { app };
