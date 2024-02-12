import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  type Item {
    id: Int
    type: String
    description: String!
  }

  type Query {
    items(type: String): [Item]
  }
`;

const items = [
    { id: 1, type: "prefix", description: "Air" },
    { id: 2, type: "prefix", description: "Jet" },
    { id: 3, type: "prefix", description: "Flight" },
    { id: 4, type: "suffix", description: "Hub" },
    { id: 5, type: "suffix", description: "Station" },
    { id: 6, type: "suffix", description: "Mart" }
]

const resolvers= {
    Query: {
        items(_, args) {
            console.log(args)
            return items.filter(item => item.type === args.type)
        },
    }
}

const server = new ApolloServer({
    typeDefs, resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);