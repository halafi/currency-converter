import { GraphQLObjectType } from 'graphql';
import currencies from './currencies';
import stats from './stats';

const rootQuery = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of all queries',
  fields: {
    stats,
    currencies,
  },
});

export default rootQuery;
