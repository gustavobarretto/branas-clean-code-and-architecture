// @ts-nocheck
import express from "express";
import Ride from "./Ride";
import Passenger from "./Passenger";
import Driver from "./Driver";
import pgp from "pg-promise";

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
    const { id } = new Passenger(name, email, document);
    res.json({
      passenger_id: id
    }).status(201);
  } catch (e) {
    res.status(400).send({
      status: "Bad Request",
      code: 400,
      message: e.message
    });
  }
})

app.get("/passengers/:passengerId", async function(req, res) {
  const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
  const [passengerData] = await connection.query("select * from cccat12.passenger where passenger_id = $1", [req.params.passengerId]);
  await connection.$pool.end();
  res.json(passengerData);
});

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

app.get("/drivers/:driverId", async function(req, res) {
  const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
  const [driverData] = await connection.query("select * from cccat12.driver where driver_id = $1", [req.params.driverId]);
  await connection.$pool.end();
  res.json({
    driverId: driverData.driver_id,
    name: driverData.name,
    email: driverData.email,
    document: driverData.document,
    carPlate: driverData.car_plate
  });
});

app.listen(3000);
