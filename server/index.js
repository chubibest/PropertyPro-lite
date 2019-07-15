import '@babel/polyfill';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import router from './router/router';

const swaggerDocument = YAML.load(`${process.cwd()}/server/docs/docs.yaml`);


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(express.static('UI'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/api/v1', (req, res) => {
  const welcome = '<h1>Welcome!!! <br> PropertyPro-lite API Version 1.0</h1> <h2>Hello</h2>';
  return res.status(200).send(welcome);
});

app.all('*', (request, response) => {
  response.status(404).send('<h2>Hello friend, seems you are lost <br> please enter a valid route</h2>');
});


app.listen(PORT);

export default app;
