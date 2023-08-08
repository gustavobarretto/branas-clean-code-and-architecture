import { Request, Response } from "express";
import CreatePassengerUseCase from "../../application/usecase/passenger/CreatePassengerUseCase";
import FindUserByIdUseCase from "../../application/usecase/passenger/FindUserByIdUseCase";

export default class PassengerHandler {
  findUserByIdUseCase: FindUserByIdUseCase;

  constructor(
    findUserByIdUseCase: FindUserByIdUseCase
  ) {
    this.findUserByIdUseCase = findUserByIdUseCase;
  }

  async findUserById(req: Request, res: Response) {
    res.json(this.findUserByIdUseCase.execute(req.body.id));
  }
}
