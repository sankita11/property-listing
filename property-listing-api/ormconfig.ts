import {ConnectionOptions} from "typeorm";
import path from "path";

const isCompiled = path.extname(__filename).includes('js');

export default {
  type: "postgres",
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 54321,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "property-rentals",
  synchronize: !process.env.DB_NO_SYNC,
  migrationsRun: true,
  logging: !process.env.DB_NO_LOGS,
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
