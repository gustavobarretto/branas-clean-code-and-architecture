import Passenger from "../../domain/Passenger"
import pgp from "pg-promise"

export default class FindUserByIdUseCase {
  constructor() { }

  async execute(input: Input): Promise<Output> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const { id, name, email, document } = await connection.query(
      "select * from cccat12.passenger where passenger_id = $1",
      [input.id],
    );
    await connection.$pool.end();
    return { id, name, email, document }
  }
}

type Input = { id: string }

type Output = {
  id: string,
  name: string,
  email: string,
  document: string
}
