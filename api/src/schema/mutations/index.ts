import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLFloat } from 'graphql';

const ConversionPayloadType = new GraphQLObjectType({
  name: 'ConversionPayload',
  fields: () => ({
    rate: {
      type: GraphQLNonNull(GraphQLFloat),
    },
    result: {
      type: GraphQLNonNull(GraphQLFloat),
    },
  }),
});

const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root of all mutations',
  fields: () => ({
    conversion: {
      type: ConversionPayloadType,
      args: {
        baseCur: { type: GraphQLNonNull(GraphQLString) },
        targetCur: { type: GraphQLNonNull(GraphQLString) },
        amount: { type: GraphQLNonNull(GraphQLFloat) },
      },
      resolve: async (_, args, ctx) => {
        const newConversionRecord = await ctx.convert(args.baseCur, args.targetCur, args.amount);

        return newConversionRecord;
      },
    },
  }),
});

export default rootMutation;
