import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import schema from './schema';
import context from './context';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: process.env.NODE_ENV !== 'production',
    schema,
    context,
  }),
);

app.listen(port, () =>
  console.log(`[server] ENV=${process.env.NODE_ENV} listening on port ${port}!`),
);
