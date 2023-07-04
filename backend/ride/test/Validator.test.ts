// @ts-nocheck
import Validator from "../src/Validator"

test("Given a document, when validate, then return true", function () {
  // Arrange
  const input = new Validator("937.424.380-69");
  // Act, Assert
  expect(input.validate()).toBeTruthy();
})

test("Given a document with score and dots, when validate, then return true", function () {
  // Arrange
  const input = new Validator("937.424.380-69");
  // Act, Assert
  expect(input.validate()).toBeTruthy();
})

test("Given invalid document, when validate, then return false", function () {
  // Arrange
  const input = new Validator("12345678900");
  // Act, Assert
  expect(input.validate()).toBeFalsy();
})

test("Given invalid document with more than 11 characteres, when validate, then return false", function () {
  // Arrange
  const input = new Validator("123456789101112")
  // Act, Assert
  expect(input.validate()).toBeFalsy();
})

test("Given invalid document with less than 11 characteres, when validate, then return false", function () {
  // Arrange
  const input = new Validator("123456789")
  // Act, Assert
  expect(input.validate()).toBeFalsy();
})

test("Given undefined document, when validate, then return false", function () {
  // Arrange
  const input = new Validator(undefined);
  // Act, Assert
  expect(input.validate()).toBeFalsy;
})

test("Given null document, when validate, then return false", function () {
  // Arrange
  const input = new Validator(null);
  // Act, Assert
  expect(input.validate()).toBeFalsy;
})

test("Given blank document, when validate, then return false", function () {
  // Arrange
  const input = new Validator("");
  // Act, Assert
  expect(input.validate()).toBeFalsy;
})
