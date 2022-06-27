import express, { Application } from 'express';
import cors from 'cors';
import 'dotenv/config';

import './database/connectionDatabase';
import { auth, product, user, admin } from './routes';

const app: Application = express();

app.set('port', process.env.PORT || 5000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', auth);
app.use('/api/product', product);
app.use('/api/user', user);
app.use('/api/admin', admin);

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});