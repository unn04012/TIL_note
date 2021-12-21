import express, { Router, Request, Response, NextFunction } from 'express';
import nunjucks from 'nunjucks';
import path from 'path';

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
    // nunjucks.render(path.resolve(__dirname))

    this.port = appConfig.port;
    this.applySettings(appConfig.settings);
    this.applyMiddlewares(appConfig.middlewares);
    this.applyRoutes(appConfig.routes);
    this.app.use(this.notFoundError);
    // this.app.use(this.serverError);
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
    const error = new Error('There is no router');
    next(error);
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
