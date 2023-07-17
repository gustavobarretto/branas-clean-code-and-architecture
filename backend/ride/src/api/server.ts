// @ts-nocheck
import express from "express";
import PassengerHandler from "./handlers/PassengerHandler";
import DriverHandler from "./handlers/DriverHandler";
import RideHandler from "./handlers/RideHandler";
import RouterConfiguration from "./controller/RouterConfiguration";

function startServer() {
  const app = express();
  app.use(express.json());
  const routes = new RouterConfiguration(
    app,
    new PassengerHandler(),
    new DriverHandler(),
    new RideHandler(),
  );
  routes.configure();
  app.listen(3000);
}

startServer();
