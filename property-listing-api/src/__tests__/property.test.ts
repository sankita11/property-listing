import "reflect-metadata";
import { DBConnect } from './__utils/TesDBConnect';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import express from 'express';
import { PropertyResolver } from '../graphql/resolvers/Property';
import { buildSchema } from 'type-graphql';
import { insertProperty } from "../db/repositories/property.repository";
import { PropertyInputType } from "../graphql/types/PropertyInput";
import { Connection } from "typeorm";

describe('Property Queries', () => {
  
  let server: ApolloServer<ExpressContext>;
  let db : Connection | null;
  
  beforeEach(async () => {

    db = await DBConnect()

    const schema = await buildSchema({
      resolvers: [PropertyResolver],
      emitSchemaFile: true,
      validate: false,
    });
  
    
    server = new ApolloServer({schema});
  
    await server.start();
    const app: express.Application = express();
    server.applyMiddleware({app});

    const property : PropertyInputType= {
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
      propertyFeatures: [{
        id: 1,
        feature: "Swimming pool"
      }]
    }

    insertProperty(property);

  });

  afterEach( async () => {
    await server.stop();
    db?.close();
  })

  // graphl query
  const GET_PROPERTY = `
  {
    property(id: 1) {
        id
        propertyDescription
    }
  }
  `;

  it('should property by id', async() => {
    const response = await server.executeOperation({
      query: GET_PROPERTY,
    });
     
    expect(response.data?.property).toEqual({ id: "1", propertyDescription: "some description" });
  })


});

