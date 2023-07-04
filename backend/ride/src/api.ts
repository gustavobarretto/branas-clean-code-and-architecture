// @ts-nocheck
import express from "express";
import Ride from "./Ride";
import Passenger from "./Passenger";
import Driver from "./Driver";

const app = express();

app.use(express.json());

app.post("/calculate_ride", function(req, res) {
  try {
    const ride = new Ride();
    for (const segment of req.body.segments) {
      ride.addSegment(segment.distance, new Date(segment.date));
    }
    const price = ride.calculate();
    res.json({ price });
  } catch (e) {
    res.status(422).send(e.message);
  }
});

app.post("/passengers", function(req, res) {
  try {
    const { name, email, document } = req.body;
    const passengerID = new Passenger(name, email, document);
    res.json({
      passenger_id: passengerID
    }).status(201);
  } catch (e) {
    res.status(400).send({
      status: "Bad Request",
      code: 400,
      message: e.message
    });
  }
})

app.post("/driver", function(req, res) {
  try {
    const { name, email, document, driverLicense } = req.body;
    const driverID = new Driver(name, email, document, driverLicense);
    res.json({
      driver_id: driverID
    }).status(201);
  } catch (e) {
    res.status(400).send({
      status: "Bad Request",
      code: 400,
      message: e.message
    });
  }
})
app.listen(3000);
