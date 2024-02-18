import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import * as dns from 'dns';
import { deleteItem, getItems, getItemsByType, saveItem } from './service.ts';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `
  type Item {
    id: Int
    type: String
    description: String
  }
  
  type Domain {
    name: String
    checkout: String
    available: Boolean
    extension: String
  }

  type Query {
    items(type: String): [Item]
  }
  
  input ItemInput {
    type: String
    description: String
  }
  
  type Mutation {
    saveItem(item: ItemInput): Item
    
    deleteItem(id: Int): Boolean
    
    generateDomains: [Domain]
    generateDomain(name: String): [Domain]
  }
`;

const isDomainAvailable = (url: string) => {
  return new Promise((resolve) => {
    dns.resolve(url, (err) => {
      if (err) {
        resolve(true);
      }
      resolve(false);
    });
  });
};

const items = [];

const resolvers = {
  Query: {
    async items(_, args) {
      const items = await getItemsByType(args.type);
      return items;
    },
  },
  Mutation: {
    async saveItem(_, args) {
      const { item } = args;
      const [newItem] = await saveItem(item);
      return newItem;
    },
    async deleteItem(_, args) {
      const { id } = args;
      await deleteItem(id);
      return true;
    },
    async generateDomains() {
      const domains = [];
      const items = await getItems();
      for (const prefix of items.filter((item) => item.type === 'prefix')) {
        for (const suffix of items.filter((item) => item.type === 'suffix')) {
          const name = prefix.description + suffix.description;
          const url = name.toLowerCase();
          const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=.com.br`;
          const available = await isDomainAvailable(`${url}.com.br`);
          domains.push({
            name,
            checkout,
            available,
          });
        }
      }
      return domains;
    },
    async generateDomain(_, args) {
      const name = args.name;
      const domains = [];
      const extensions = ['.com.br', '.com', '.net.br', '.org.org'];
      for (const extension of extensions) {
        const url = name.toLowerCase();
        const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=${extension}`;
        const available = await isDomainAvailable(`${url}${extension}`);
        domains.push({
          name,
          checkout,
          available,
          extension,
        });
      }
      return domains;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
