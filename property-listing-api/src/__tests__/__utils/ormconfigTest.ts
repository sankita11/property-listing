import {ConnectionOptions} from "typeorm";
import path from "path";

const isCompiled = path.extname(__filename).includes('js');

export default {
  type: "postgres",
  host: "127.0.0.1",
  port:  54323,
  username:  "postgrestest",
  password: "password",
  database: "property-rentals",
  synchronize: true,
  migrationsRun: true,
  logging: true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 2000,
  entities: [
    `src/db/model/**/*.${isCompiled ? "js" : "ts"}`
  ],
  migrations: [
    `src/db/migrations/**/*.${isCompiled ? "js" : "ts"}`
  ],
  cli: {
    "entitiesDir": "src/db/model",
    "migrationsDir": "src/db/migrations",
  },
} as ConnectionOptions;
