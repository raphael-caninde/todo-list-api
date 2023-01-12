import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/todoListRoutes';
import errorMiddleware from './middlewares/errorMiddleware';
import 'dotenv/config';

class App {

  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.use('/user', userRoutes);
    this.app.use('/task', taskRoutes);
    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => { console.log(`Rodando na porta ${PORT}`); });
  }
}

export { App };
