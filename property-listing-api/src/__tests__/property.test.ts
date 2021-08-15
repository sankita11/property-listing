import { createTestClient } from 'apollo-server-testing';

import { DBConnect } from './__utils/DBConnectTest';
import {createServer} from './__utils/create-apollo-server';

import { buildSchema } from 'type-graphql';
import { PropertyResolver } from '../../src/graphql/resolvers/Property';

describe('Property Queries', async() => {
  let dbConnection = await DBConnect();

  const schema = await buildSchema({
    resolvers: [PropertyResolver],
    emitSchemaFile: true,
    validate: false,
  });
  
  const server = createServer();
  const { query } = createTestClient(server);

  
  // graphl query
  const GET_PROPERTY = `
  {
    property(id: 1) {
        id
        propertyDescription
    }
  }
  `;


  after(async () => {
    await dbConnection?.close();
  });

  beforeEach(async () => {
    //await insertProperty(property);
  });

  describe('GET property list', () => {
    it('should get property by ID', async () => {
        const response = await query({ query: GET_PROPERTY });

        expect(response.data.property).to.equal([{ id: 1, propertyDescription: "some description" }]);
    });

  });


});