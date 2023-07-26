import Passenger from "../../domain/Passenger"

export default class CreatePassengerUseCase {
  constructor() { }

  async execute(input: Input): Promise<Output> {
    const passenger = new Passenger(input.name, input.email, input.document);


    return { id: passenger.id };
  }
}

type Input = {
  name: string,
  email: string,
  document: string,
}

type Output = {
  id: string
}
