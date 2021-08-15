import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PropertyResolver } from './graphql/resolvers/Property';

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import {DBConnect} from "./db/config";
import { PropertyTypesResolver } from "./graphql/resolvers/PropertyTypes";
import { FeatureResolver } from "./graphql/resolvers/Feature";



const main = async () => {
  
  const schema = await buildSchema({
    resolvers: [PropertyResolver, PropertyTypesResolver, FeatureResolver],
    emitSchemaFile: true,
    validate: false,
  });

  
  await DBConnect();
  
  
  const server = new ApolloServer({schema});
  await server.start();
  const app: express.Application = express();
  server.applyMiddleware({app});
  
  app.use(cors());
  app.use(bodyParser.json());

  // Just checking if given PORT variable is an integer or not
  let port = parseInt(process.env.PORT || "");
  if (isNaN(port) || port === 0) {
    port = 4000;
  }
  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
  
}

main().catch((error)=>{
  console.log(error, 'error');
})


