const mongoose = require("mongoose");
const request = require("supertest");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const app = require("../../app");
const { user: service } = require("../../services");

const { DB_TEST_HOST, PORT = 3000 } = process.env;

describe("test login", () => {
  let server;

  beforeAll(() => (server = app.listen(PORT)));

  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.close(() => done());
  });

  test("test login", async () => {
    const newUser = {
      email: "user@gmail.com",
      password: "123456",
      avatarURL: gravatar.url("user@gmail.com"),
    };

    const hashPassword = await bcrypt.hash(newUser.password, 10);

    const user = await service.createUser({
      ...newUser,
      password: hashPassword,
    });

    const loginUser = {
      email: "user@gmail.com",
      password: "123456",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);

    expect(response.statusCode).toBe(200);

    const {
      body: { data },
    } = response;
    const { token } = await service.findUser(user._id);

    expect(data.token).toBeTruthy();
    expect(data.token).toBe(token);

    expect(data.user).toBeTruthy();
    expect(typeof data.user).toBe("object");
    expect(typeof data.user.email).toBe("string");
    expect(typeof data.user.subscription).toBe("string");
  });
});
