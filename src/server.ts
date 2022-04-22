import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import db from './database';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/index';
import * as dotenv from 'dotenv';

dotenv.config();

// Create Server
const app: Application = express();

const port = process.env.PORT || 3000;

const address = 'localhost:3000';

const corsOptions = {
  origin: 'http://someotherdomain.com',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// use the logger middleware
app.use(morgan('dev'));

app.use(bodyParser.json());

app.use('/api', routes);

// Endpoint
app.get('/', function (_req: Request, res: Response) {
  res.send('App Started.<br>Main Route!');
});

// check cors endpoint
app.get('/test-cors', cors(corsOptions), (_req: Request, res: Response) => {
  res.json({ msg: 'This is CORS-enabled with a middleware' });
});

// check server
app.listen(port, () => {
  console.log(`From server.ts: Starting app on: ${address}`);
});

// test db connection is successful
db.connect().then(async (client) => {
  return client
    .query('SELECT NOW()')
    .then((res) => {
      client.release();
      console.log(res.rows);
    })
    .catch((err) => {
      client.release();
      console.log(err.stack);
    });
});

export default app;
