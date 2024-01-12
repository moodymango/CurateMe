const userController = require("../../server/controllers/userController.js");
const userSchema = require("../../server/db.js");
//must mock the functionality of calling the database just to ensure my logic is working, should most likely save fake data to return back to ensure the logic is working as intended.
jest.mock();
describe("Creating a new user with mocking", () => {
  test("Should create new user, send status 200, and send the user id over to the frontend ", async () => {
    //mock Express Request and Response Objects and next function
    const req = {
      username: "moodymango",
      password: "",
      first_name: "Imma",
      last_name: "Duverger",
    };
    const res = {
      send: jest.fn(),
      status: jest.fn(() => res),
    };
    const mockedNext = jest.fn();
  });
});
describe("Reading user information with mocking", () => {});
describe("Updating user information with mocking", () => {});
describe("Deleting user information with mocking", () => {});
