import {Connection, createConnection, getConnection} from "typeorm";
import ORMConfig from "./ormconfigTest";

export const DBConnect = async (): Promise<Connection | null> => {
    try {
      const conn = await createConnection(ORMConfig);
      console.log(`test Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`);
    } catch (err) {
      console.log(err);
    }
    return null;
};

