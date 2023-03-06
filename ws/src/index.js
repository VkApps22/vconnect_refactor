import http from 'http';
import app from './web';
import { mongo } from './config';
import { migrate, scan } from './migration';

mongo.connect().then(() => scan().then(() => migrate()));
http.createServer(app.callback()).listen(3000);
