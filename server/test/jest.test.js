const request = require("supertest");
const app = require("../app");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;

let id = null;
let token = null;

afterAll(done => {
  User.destroy({ where: { id } })
    .then(result => {
      done();
    })
    .catch(err => done(err));
});

// =================================== USERS ===================================

// <--- register user with 201 and 400 response
describe("REGISTER NEW USER", function() {
  describe("~> SUCCESSFULLY Register new user", function() {
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
          id = body.id;
          token = body.token;
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe("~> UNSUCCESSFULLY Register new user with email already registered", function() {
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
describe("USER LOGIN", function() {
  describe("~> SUCCESSFULLY Login as user", function() {
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

  describe("~> UNSUCCESSFULLY Login as user with wrong password", function() {
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

  describe("~> UNSUCCESSFULLY Login as user with wrong email", function() {
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

// =================================== FAVORITES ===================================

let favID = null;

afterAll(done => {
  queryInterface
    .bulkDelete("Favorites", {})
    .then(() => done())
    .catch(err => done(err));
});

// <--- add favorites with 201 and 400 response
describe("ADD FAVORITE BY USER", function() {
  describe("~> SUCCESSFULLY Add favorites by user", function() {
    it("Should return 201 and object (message and favorites)", done => {
      request(app)
        .post("/favorites")
        .set({
          token: token
        })
        .send({
          recipeId: 200,
          title: "Sirloin Steak",
          ready: 20,
          serving: 1,
          image:
            "https://www.wholesomeyum.com/wp-content/uploads/2019/05/wholesomeyum-how-to-cook-top-sirloin-steak-in-the-oven-5-500x375.jpg"
        })
        .then(response => {
          let { body, status } = response;
          expect(status).toBe(201);
          expect(body).toHaveProperty(
            "message",
            "Success added a new favorite"
          );
          expect(body).toHaveProperty("favorite");
          expect(body.favorite).toHaveProperty("recipeId", 200);
          expect(body.favorite).toHaveProperty("title", "Sirloin Steak");
          expect(body.favorite).toHaveProperty("ready", 20);
          expect(body.favorite).toHaveProperty("serving", 1);
          expect(body.favorite).toHaveProperty(
            "image",
            "https://www.wholesomeyum.com/wp-content/uploads/2019/05/wholesomeyum-how-to-cook-top-sirloin-steak-in-the-oven-5-500x375.jpg"
          );
          favID = body.favorite.id;
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe("~> UNSUCCESSFULLY Add favorites by user", function() {
    it("Should return 400 and object (message)", done => {
      request(app)
        .post("/favorites")
        .set({
          token: token
        })
        .send({
          recipeId: 200,
          title: "Sirloin Steak",
          ready: 20,
          serving: 1,
          image:
            "https://www.wholesomeyum.com/wp-content/uploads/2019/05/wholesomeyum-how-to-cook-top-sirloin-steak-in-the-oven-5-500x375.jpg"
        })
        .then(response => {
          let { status, body } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty(
            "message",
            "This is already in your favorite"
          );
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
});

// <--- get favorite by ID with 200 response
describe("GET FAVORITES BY USERID", function() {
  describe("~> SUCCESFULLY Get favorites by UserId", function() {
    it("Should return 200 and object (message, favorites)", done => {
      request(app)
        .get("/favorites")
        .set({
          token: token
        })
        .then(response => {
          let { status, body } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty(
            "message",
            "Success retrieved your favorites"
          );
          expect(body).toHaveProperty("favorites");
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
});

// <--- get most all favorite with 200 response
describe("GET MOST ALL FAVORITES", function() {
  describe("~> SUCCESSFULLY Get most all favorites", function() {
    it("Should return 200 and object (mostFavorite)", done => {
      request(app)
        .get("/favorites/most")
        .then(response => {
          let { status, body } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("mostFavorite");
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
});

// <--- delete favorite by ID with 200 and 404 response
describe("DELETE FAVORITES BY ID", function() {
  describe("~> SUCCESSFULLY Delete favorite by ID", function() {
    it("Should return 200 and object (message)", done => {
      request(app)
        .delete(`/favorites/${favID}`)
        .set({
          token: token
        })
        .then(response => {
          let { status, body } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("message", "Success deleted a favorite");
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe("~> UNSUCCESSFULLY Delete favorite by ID", function() {
    it("Should return 404 and object (message)", done => {
      request(app)
        .delete(`/favorites/${favID}`)
        .set({
          token: token
        })
        .then(response => {
          let { status, body } = response;
          expect(status).toBe(404);
          expect(body).toHaveProperty("message", "Favorite not found");
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
});
