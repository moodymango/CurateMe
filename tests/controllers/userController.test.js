const userController = require("../../server/controllers/userController.js");
const { Pool } = require("pg");
//must mock the functionality of calling the database just to ensure my logic is working, should most likely save fake data to return back to ensure the logic is working as intended.
jest.mock("pg", () => {
  const mPool = {
    connect: function () {
      return { query: jest.fn() };
    },
    query: jest.fn(),
    end: jest.fn(),
    on: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});
describe("Mocking calls to the database", () => {
  let pool;
  //before each test case
  beforeEach(() => {
    pool = new Pool();
  });
  //clean up after each test case
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("Creating a new user with mocking", () => {
    test("Should create new user, send status 200, and send the user id over to the frontend ", async () => {
      //mock Express Request and Response Objects and next function
      const req = {
        body: {
          username: "moodymango",
          password: "HhiUEbeHUE092",
          first_name: "Imma",
          last_name: "Duverger",
        },
      };
      const res = {
        send: jest.fn(),
        status: jest.fn(() => res),
      };
      const mockedNext = jest.fn();
      const text =
        "INSERT INTO users(first_name, last_name, username, password) VALUES($1, $2, $3, $4)";
      const params = [
        req.body.first_name,
        req.body.last_name,
        req.body.username,
        req.body.password,
      ];
      //pool.query(test, params, callback)
      pool.query.mockResolvedValue({ rows: [] });
      const newUser = userController.createUser(req, res, mockedNext);
      console.log("new user is", newUser);
      expect(pool.query).toBeCalledTimes(1);
      expect(pool.query).toHaveBeenCalledWith(text, params);
      expect(newUser).toEqual(
        expect.objectContaining({
          rows: expect.any(String),
        })
      );
    });
    test("Should produce error object if the username already exists", async () => {});
    test("Should produce error object if there is no username or password, or both", async () => {});
  });
  describe("Reading user information with mocking", () => {});
  describe("Updating user information with mocking", () => {});
  describe("Deleting user information with mocking", () => {});
});
