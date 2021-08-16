import { ApolloServer, gql } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Property } from '../../../src/db/model/Property';
import { PropertyResolver } from '../../graphql/resolvers/Property';

export const createServer = async () => {
    // graphql schema definition
    const typeDefs = gql`
    type Property{
        id: ID!
        monthlyRent: Int!
        moveInDate: String!
        numberOfBathrooms: Int!
        numberOfBedrooms: Int!
        propertyDescription: String!
        propertyTypeID: Int!
        updatedAt: String!
        coverImageUrl: String!
        createdAt: String!
      }
        type Query {
          property(id: ID): Property
        }
      `;

     
  
    // static list of properties
    const properties: Property[]  = [
        {
            id: 1,
            propertyTypeID: 9,
            address: {
                flatNumber: "11",
                addressLine1: "some address",
            },
            numberOfBathrooms: 1,
            numberOfBedrooms: 1,
            monthlyRent: 100,
            moveInDate: new Date("2021-09-04T00:23:05.000Z"),
            propertyDescription: "some description",
            coverImageUrl: "",
            createdAt: new Date(),
            updatedAt: new Date(),
            propertyFeature: []
        }
    ];
  
    // // resolvers: to map queries & mutation to actual functions
    // const resolvers = {
    //   Query: {
    //     property: (id: number) => (id ? properties.filter(t => t.id === id) : properties)
    //   },
    // };
  
    // const server = new ApolloServer({ typeDefs, resolvers });
  
    const schema = await buildSchema({
      resolvers: [PropertyResolver],
      emitSchemaFile: true,
      validate: false,
    });
  
    
    const server = new ApolloServer({schema});
   

    return server;
  };
  