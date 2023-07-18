// @ts-nocheck
import PassengerHandler from "../handlers/PassengerHandler";
import DriverHandler from "../handlers/DriverHandler";
import RideHandler from "../handlers/RideHandler";

export default class RouterConfiguration {
  readonly app: any;

  constructor(
    readonly app: any,
    readonly passengerHandler: PassengerHandler,
    readonly driverHandler: DriverHandler,
    readonly rideHandler: RideHandler,
  ) {
    this.app = app;
  }
  configure() {
    this.app.post("/calculate_ride", this.rideHandler.calculate);
    this.app.post("/passengers", this.passengerHandler.create);
    this.app.get(
      "/passengers/:passengerId",
      this.passengerHandler.findUserById,
    );
    this.app.post("/driver", this.driverHandler.create);
    this.app.get("/drivers/:driverId", this.driverHandler.findDriverById);
  }
}
