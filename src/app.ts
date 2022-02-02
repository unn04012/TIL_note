import express, { Router, Request, Response, NextFunction } from 'express';
import nunjucks from 'nunjucks';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import HttpException from './error/Error';
import castErrorHandler from './error/ErrorMiddleware';
const __dirname = path.resolve();
const swaggerSpec = YAML.load(path.join(__dirname, './src/docs/openAPI.yaml'));

interface Setting {
  key: string;
  value: string;
}
interface Route {
  path: string;
  router: Router;
}

export default class App {
  app = express();
  port;
  constructor(appConfig: {
    routes: Array<Route>;
    middlewares: any;
    settings: Array<Setting>;
    port: string | undefined | number;
  }) {
    nunjucks.configure('views', {
      // 폴더 경로
      express: this.app,
      watch: true,
    });

    this.port = appConfig.port;
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    this.applySettings(appConfig.settings);
    this.applyMiddlewares(appConfig.middlewares);
    this.applyRoutes(appConfig.routes);
    this.app.use(castErrorHandler);
    this.app.use(this.notFoundError);
  }

  applySettings(settings: Array<Setting>) {
    settings.forEach(setting => {
      this.app.set(setting.key, setting.value);
    });
  }

  applyRoutes(routes: Array<Route>) {
    routes.forEach(route => {
      this.app.use(route.path, route.router);
    });
  }

  applyMiddlewares(middlewares: any) {
    middlewares.forEach((middleware: any) => {
      this.app.use(middleware);
    });
  }

  notFoundError = (req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({ errorCode: 404, errorMessage: 'Not Found' });
    next();
  };

  wrapAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    // callback function : 인자로 함수를 전달하는 함수

    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next);
    };
  };

  // serverError = (err: Error, res: Response) => {
  //   res.locals.message = err.message;
  //   res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  //   res.status(500);
  //   res.render('error');
  // };

  listen() {
    this.app.listen(this.port, () => {
      console.log(this.port, '번 포트에서 대기중');
    });
  }
}
