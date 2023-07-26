import { Request, Response } from "express";
import CreatePassengerUseCase from "../../application/usecase/passenger/CreatePassengerUseCase";
import FindUserByIdUseCase from "../../application/usecase/passenger/FindUserByIdUseCase";

export default class PassengerHandler {
  constructor(
    readonly createPassengerUseCase: CreatePassengerUseCase,
    readonly findUserByIdUseCase: FindUserByIdUseCase
  ) { }

  async create(req: Request, res: Response) {
    try {
      const { name, email, document } = req.body;
      const { id } = await this.createPassengerUseCase.execute({ name, email, document })
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
    res.json(this.findUserByIdUseCase.execute(req.body.id));
  }
}
