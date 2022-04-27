import express, { Application } from 'express';
import cors from 'cors';
import 'dotenv/config';

import './database/connectionDatabase';
import auth from './routes/auth';
import product from './routes/product';

const app: Application = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', auth);
app.use('/api/product', product);

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});