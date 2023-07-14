import { Request, Response } from "express";
import Driver from "../../application/domain/Driver";
import pgp from "pg-promise";


export default class DriverHandler {
  constructor() { }

  async create(req: Request, res: Response) {
    try {
      const { name, email, document, driverLicense } = req.body;
      const driverID = new Driver(name, email, document, driverLicense);
      res
        .json({
          driver_id: driverID,
        })
        .status(201);
    } catch (e: any) {
      res.status(400).send({
        status: "Bad Request",
        code: 400,
        message: e.message,
      });
    }
  }

  async findDriverById(req: Request, res: Response) {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [driverData] = await connection.query(
      "select * from cccat12.driver where driver_id = $1",
      [req.params.driverId]
    );
    await connection.$pool.end();
    res.json({
      driverId: driverData.driver_id,
      name: driverData.name,
      email: driverData.email,
      document: driverData.document,
      carPlate: driverData.car_plate,
    });
  }
}
