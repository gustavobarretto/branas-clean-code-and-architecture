// @ts-nocheck
import express from "express";
import PassengerHandler from "../handlers/PassengerHandler";
import DriverHandler from "../handlers/DriverHandler";
import RideHandler from "../handlers/RideHandler";

const app = express();
const passengerHandler = new PassengerHandler();
const driverHandler = new DriverHandler();
const rideHandler = new RideHandler();

app.use(express.json());

app.post("/calculate_ride", rideHandler.calculate);

app.post("/passengers", passengerHandler.create);
app.get("/passengers/:passengerId", passengerHandler.findUserById);

app.post("/driver", driverHandler.create);
app.get("/drivers/:driverId", driverHandler.findDriverById);

app.listen(3000);
