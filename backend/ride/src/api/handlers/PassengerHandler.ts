import { Request, Response } from "express";
import Passenger from "../../application/domain/Passenger";
import pgp from "pg-promise";

export default class PassengerHandler {
  constructor() {}

  async create(req: Request, res: Response) {
    try {
      const { name, email, document } = req.body;
      const { id } = new Passenger(name, email, document);
      res
        .json({
          passenger_id: id,
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

  async findUserById(req: Request, res: Response) {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [passengerData] = await connection.query(
      "select * from cccat12.passenger where passenger_id = $1",
      [req.params.passengerId]
    );
    await connection.$pool.end();
    res.json(passengerData);
  }
}
