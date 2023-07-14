import { Request, Response } from "express";
import Ride from "../../application/domain/Ride";

export default class RideHandler {
  constructor() {}

  calculate(req: Request, res: Response) {
    try {
      const ride = new Ride();
      for (const segment of req.body.segments) {
        ride.addSegment(segment.distance, new Date(segment.date));
      }
      const price = ride.calculate();
      res.json({ price });
    } catch (e: any) {
      res.status(422).send(e.message);
    }
  }
}
