import axios from "axios";

axios.defaults.validateStatus = function() {
  return true;
};

test("Deve fazer o cálculo do preço de uma corrida durante o dia", async function() {
  const input = {
    segments: [
      { distance: 10, date: "2021-03-01T10:00:00" }
    ]
  };
  const response = await axios.post("http://localhost:3000/calculate_ride", input);
  const output = response.data;
  expect(output.price).toBe(21);
});

test("Se a distância for inválida deve lançar um erro", async function() {
  const input = {
    segments: [
      { distance: -10, date: "2021-03-01T10:00:00" }
    ]
  };
  const response = await axios.post("http://localhost:3000/calculate_ride", input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output).toBe("Invalid distance");
});

test("Given a passenger with invalid document, when create, then return bad request", async function() {
  // Arange
  const input = {
    name: "Joe",
    email: "joe@gmail.com",
    document: "2134123"
  }
  // Act
  const response = await axios.post("http://localhost:3000/passengers", input)
  expect(response.status).toBe(400);
  expect(response.data.message).toBe("Invalid document.")
})

test("Given a valid passenger, when create, then return id", async function() {

})
