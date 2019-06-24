import express from 'express';
import router from './router/router';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(express.static('UI'));


app.listen(PORT);

export default app;
