import pgp from "pg-promise";
import { IClient } from "pg-promise/typescript/pg-subset";

export default class Database {

  readonly database: IClient

  constructor() {
    try {
      this.database = pgp()("postgres://postgres:123456@localhost:5432/app");
    } catch (e) {
      throw new Error("Error to connect to the database.");
    }
  }

  public getClient(): IClient {
    return this.database;
  }
}
