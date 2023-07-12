import Validator from "./Validator";
import { v4 as uuid } from "uuid"

export default class Driver {
  readonly id: string;
  name: string;
  email: string;
  document: string;
  driverLicense: string;

  constructor(name: string, email: string, document: string, driverLicense: string) {
    const validator: Validator = new Validator(document)
    if (!validator.validate()) throw new Error("Invalid document.")
    this.id = uuid();
    this.name = name;
    this.email = email;
    this.document = validator.giveOnlyDocumentNumbers();
    this.driverLicense = driverLicense;
  }
}
