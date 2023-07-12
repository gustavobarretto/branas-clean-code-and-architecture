// @ts-nocheck
import Validator from "./Validator";
import { v4 as uuid } from "uuid";

export default class Passenger {
  readonly id: string;
  name: string;
  email: string;
  readonly document: string;

  constructor(name: string, email: string, document: string) {
    const validator: Validator = new Validator(document)
    if (!validator.validate()) throw new Error("Invalid document.")
    this.id = uuid();
    this.name = name;
    this.email = email;
    this.document = validator.giveOnlyDocumentNumbers()
  }
}
