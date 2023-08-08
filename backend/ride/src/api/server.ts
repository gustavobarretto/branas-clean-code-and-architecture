// @ts-nocheck
import express from "express";
import PassengerHandler from "./handlers/PassengerHandler";
import DriverHandler from "./handlers/DriverHandler";
import RideHandler from "./handlers/RideHandler";
import CreatePassengerUseCase from "../application/usecase/passenger/CreatePassengerUseCase";
import FindUserByIdUseCase from "../application/usecase/passenger/FindUserByIdUseCase";

function startServer() {
  const app = express();
  app.use(express.json());
  const createPassengerUseCase = new CreatePassengerUseCase()
  const findUserByIdUseCase = new FindUserByIdUseCase()
  const passengerHandler = new PassengerHandler(
    findUserByIdUseCase,
  )

  const rideHandler = new RideHandler;
  const driverHandler = new DriverHandler;
  app.post("/calculate_ride", rideHandler.calculate);
  app.post("/passengers", async function(req: Request, res: Response) {
    try {
      const { name, email, document } = req.body;
      const { id } = await createPassengerUseCase.execute({ name, email, document })
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
  });
  app.get("/passengers/:passengerId", passengerHandler.findUserById);
  app.post("/driver", driverHandler.create);
  app.get("/drivers/:driverId", driverHandler.findDriverById);
  app.listen(3000);
}

startServer();
