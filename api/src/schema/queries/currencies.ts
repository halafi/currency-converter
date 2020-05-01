import { GraphQLList, GraphQLString } from 'graphql';

const currenciesQuery = {
  type: new GraphQLList(GraphQLString),
  resolve: (_, args, ctx) => ctx.currenciesLoader.load(args),
};

export default currenciesQuery;
