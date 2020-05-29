const request = require("supertest");
const app = require("../app");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;

let id = null;

afterAll(done => {
  User.destroy({ where: { id } })
    .then(result => {
      done();
    })
    .catch(err => done(err));
});

// <--- register user with 201 and 400 response
describe("REGISTER new user", function() {
  describe("SUCCESSFULLY register new user", function() {
    it("Should return 201 and object (name, email, password, avatar)", done => {
      request(app)
        .post("/users/register")
        .send({
          name: "new test",
          email: "newtest@gmail.com",
          password: "newtest",
          avatar:
            "https://www.clipartmax.com/png/middle/257-2572603_user-man-social-avatar-profile-icon-man-avatar-in-circle.png"
        })
        .then(response => {
          let { status, body } = response;
          expect(status).toBe(201);
          expect(body).toHaveProperty("name", "new test");
          expect(body).toHaveProperty(
            "avatar",
            "https://www.clipartmax.com/png/middle/257-2572603_user-man-social-avatar-profile-icon-man-avatar-in-circle.png"
          );
          expect(body).toHaveProperty("token");
          expect(body).toHaveProperty("id");
          // console.log(body.id);
          id = body.id;
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe("UNSUCCESSFULLY register new user with email already registered", function() {
    it("Should return 400 and object (status, message)", done => {
      request(app)
        .post("/users/register")
        .send({
          name: "test400",
          email: "test400@gmail.com",
          password: "bebas",
          avatar:
            "https://www.clipartmax.com/png/middle/257-2572603_user-man-social-avatar-profile-icon-man-avatar-in-circle.png"
        })
        .then(response => {
          let { status, body } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Email already taken");
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
});

// <--- login user with 200, 400 and 404
describe("USER Login", function() {
  describe("SUCCESSFULLY login as user", function() {
    it("Should return 200 and object (name, avatar, token)", done => {
      request(app)
        .post("/users/login")
        .send({
          email: "newtest@gmail.com",
          password: "newtest"
        })
        .then(response => {
          let { status, body } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("name");
          expect(body).toHaveProperty("avatar");
          expect(body).toHaveProperty("token");
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe("UNSUCCESSFULLY login as user with wrong password", function() {
    it("Sould return 400 and object (message)", done => {
      request(app)
        .post("/users/login")
        .send({
          email: "newtest@gmail.com",
          password: "wrongpassword"
        })
        .then(response => {
          let { status, body } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Wrong password");
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe("UNSUCCESSFULLY login as user with wrong email", function() {
    it("Should return 404 and object (message)", done => {
      request(app)
        .post("/users/login")
        .send({
          email: "wrongemail@gmail.com",
          password: "bebas"
        })
        .then(response => {
          let { status, body } = response;
          expect(status).toBe(404);
          expect(body).toHaveProperty("message", "Email not registered");
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
});
