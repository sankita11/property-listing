import {Connection, createConnection, getConnection} from "typeorm";
import ORMConfig from "../../../ormconfig";

export const DBConnect = async (): Promise<Connection | null> => {
    try {
      const conn = await createConnection(ORMConfig);
      console.log(`Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`);
    } catch (err) {
      console.log(err);
    }
    return null;
};

