import { GraphQLObjectType } from 'graphql';

const rootQuery = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of all queries',
  fields: {},
});

export default rootQuery;
