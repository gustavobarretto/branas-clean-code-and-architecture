import Passenger from "../src/application/domain/Passenger"

test("Given an invalid document, when create passenger, then return error", function() {
  expect(() => new Passenger("Joe Doe", "joedoe@gmail.com", "09202909211")).toThrow(
    new Error("Invalid document.")
  );
});

test("Given a valid document, when create passenger, then return passenger", function() {
  const passenger = new Passenger("Joe Doe", "joedoe@gmail.com", "382.529.403-07")
  expect(passenger.id).toBeDefined()
  expect(passenger.name).toBe("Joe Doe")
  expect(passenger.email).toBe("joedoe@gmail.com")
  expect(passenger.document).toBe("38252940307")
})
