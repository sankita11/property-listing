import { ApolloServer, gql } from 'apollo-server';
import { Property } from '../../../src/db/model/Property';

export const createServer = () => {
    // graphql schema definition
    const typeDefs = gql`
    type Property{
        id
        propertyTypeID
        numberOfBedrooms
        numberOfBathrooms
        monthlyRent
        moveInDate
        propertyDescription
        coverImageUrl
        createdAt
        updatedAt
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
  
    // resolvers: to map queries & mutation to actual functions
    const resolvers = {
      Query: {
        property: (parent, { id }) => (id ? properties.filter(t => t.id === id) : properties)
      },
    };
  
    const server = new ApolloServer({ typeDefs, resolvers });
  
    return server;
  };
  