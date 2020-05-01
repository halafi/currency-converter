import { GraphQLSchema } from 'graphql';
import rootQuery from './queries';
import rootMutation from './mutations';

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

export default schema;
