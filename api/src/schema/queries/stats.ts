import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
} from 'graphql';

const StatsType = new GraphQLObjectType({
  name: 'Stats',
  fields: () => ({
    mostPopularTargetCurrency: {
      type: GraphQLNonNull(GraphQLString),
    },
    totalAmountConvertedInUsd: {
      type: GraphQLNonNull(GraphQLFloat),
    },
    conversionCount: {
      type: GraphQLNonNull(GraphQLInt),
    },
  }),
});

const statsQuery = {
  type: StatsType,
  resolve: (_, args, ctx) => ctx.statsLoader.load(args),
};

export default statsQuery;
