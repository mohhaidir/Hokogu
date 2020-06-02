const request = require("supertest");
const app = require("../app");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;

let id = null;
let token = null;

afterAll(done => {
  queryInterface
      .bulkDelete('Users', {})
      .then(() => done())
      .catch(err => done(err));
});

// afterAll(done => {
//   User.destroy({ where: { id } })
//     .then(result => {
//       done();
//     })
//     .catch(err => done(err));
// });

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
          email: "newtest@gmail.com",
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
          favID = body.favorite.recipeId;
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

// <------ google login success
// describe("USER LOGIN BY GOOGLE SIGNIN", function() {
//   describe("~> SUCCESSFULLY Register by Google SignIn", function() {
//     it("Should return 200 and object (name, avatar, token)", done => {
//       request(app)
//         .post("/users/googlelogin")
//         .send({
//           idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZiOGNhNWI3ZDhkOWE1YzZjNjc4ODA3MWU4NjZjNmM0MGYzZmMxZjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMzk2MDI5OTY5MzI2LW4yY3NtN2ZrYW12OWhiNHE2ZTdmZzBxdWI3ZHE5NzE5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMzk2MDI5OTY5MzI2LW4yY3NtN2ZrYW12OWhiNHE2ZTdmZzBxdWI3ZHE5NzE5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0MDE0MTM3OTQ2ODE4OTA0NzY1IiwiZW1haWwiOiJiYW1iYWRvbUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjhMV2txNG1BR1p2NThfQ1BDdW95S0EiLCJuYW1lIjoiU2luZ2dpdCBCcmFtYW50aGEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2lBWlMyUVdvR0ZGN3RSVHlqMFBzTXVFTUVEeUxkUlBLVWdiTThHN1E9czk2LWMiLCJnaXZlbl9uYW1lIjoiU2luZ2dpdCIsImZhbWlseV9uYW1lIjoiQnJhbWFudGhhIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1OTEwMzg5MjYsImV4cCI6MTU5MTA0MjUyNiwianRpIjoiZjcwYjk2MTljOWJlYWM2ZTVmZjFhM2U3OTUwYTUyMTJmMzM2NmUwYyJ9.syPY9sqxK2gZdMJj7zQJmecTIxm9OJt_bLIguOvDmz6K0VTquVqTdxc0Auv2eWNFHt1W3a80_oKdo9I3Bigl1xRTzFGNpvhDdG2EDlvWNDP781Jz9oriXwNr8lDP85jkBJRQHuOhmrLArHiHSXle2-79wJ0e0MRiefXghTFta5CpU8HWNiBdIDK5ZTS_dGfuImfF3wXqPfd-7f68CTPKCqX9rXpqxHPnA-nUGL9u8u2CMc5RCa5NyrkGHWoXbcIlJjkmbZ3umfid4Yqk3-RWXHFMT77jGURErpTCIZOu1hjteo9XyAqK3HUf6Bp9fG6DsJmW12J0VPBwWzmpmj96BQ"
//         })
//         .then(response => {
//           let { status, body } = response;
//           expect(status).toBe(201);
//           expect(body).toHaveProperty("name");
//           expect(body).toHaveProperty("avatar");
//           expect(body).toHaveProperty("token");
//           done();
//         })
//         .catch(err => {
//           done(err);
//         });
//     });
//   });

//   describe("~> SUCCESSFULLY Login by Google SignIn", function() {
//     it("Should return 200 and object (name, avatar, token)", done => {
//       request(app)
//         .post("/users/googlelogin")
//         .send({
//           idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZiOGNhNWI3ZDhkOWE1YzZjNjc4ODA3MWU4NjZjNmM0MGYzZmMxZjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMzk2MDI5OTY5MzI2LW4yY3NtN2ZrYW12OWhiNHE2ZTdmZzBxdWI3ZHE5NzE5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMzk2MDI5OTY5MzI2LW4yY3NtN2ZrYW12OWhiNHE2ZTdmZzBxdWI3ZHE5NzE5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0MDE0MTM3OTQ2ODE4OTA0NzY1IiwiZW1haWwiOiJiYW1iYWRvbUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjhMV2txNG1BR1p2NThfQ1BDdW95S0EiLCJuYW1lIjoiU2luZ2dpdCBCcmFtYW50aGEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2lBWlMyUVdvR0ZGN3RSVHlqMFBzTXVFTUVEeUxkUlBLVWdiTThHN1E9czk2LWMiLCJnaXZlbl9uYW1lIjoiU2luZ2dpdCIsImZhbWlseV9uYW1lIjoiQnJhbWFudGhhIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1OTEwMzg5MjYsImV4cCI6MTU5MTA0MjUyNiwianRpIjoiZjcwYjk2MTljOWJlYWM2ZTVmZjFhM2U3OTUwYTUyMTJmMzM2NmUwYyJ9.syPY9sqxK2gZdMJj7zQJmecTIxm9OJt_bLIguOvDmz6K0VTquVqTdxc0Auv2eWNFHt1W3a80_oKdo9I3Bigl1xRTzFGNpvhDdG2EDlvWNDP781Jz9oriXwNr8lDP85jkBJRQHuOhmrLArHiHSXle2-79wJ0e0MRiefXghTFta5CpU8HWNiBdIDK5ZTS_dGfuImfF3wXqPfd-7f68CTPKCqX9rXpqxHPnA-nUGL9u8u2CMc5RCa5NyrkGHWoXbcIlJjkmbZ3umfid4Yqk3-RWXHFMT77jGURErpTCIZOu1hjteo9XyAqK3HUf6Bp9fG6DsJmW12J0VPBwWzmpmj96BQ"
//         })
//         .then(response => {
//           let { status, body } = response;
//           expect(status).toBe(200);
//           expect(body).toHaveProperty("name");
//           expect(body).toHaveProperty("avatar");
//           expect(body).toHaveProperty("token");
//           done();
//         })
//         .catch(err => {
//           done(err);
//         });
//     });
//   });
// })
  // "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZiOGNhNWI3ZDhkOWE1YzZjNjc4ODA3MWU4NjZjNmM0MGYzZmMxZjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMzk2MDI5OTY5MzI2LW4yY3NtN2ZrYW12OWhiNHE2ZTdmZzBxdWI3ZHE5NzE5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMzk2MDI5OTY5MzI2LW4yY3NtN2ZrYW12OWhiNHE2ZTdmZzBxdWI3ZHE5NzE5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0MDE0MTM3OTQ2ODE4OTA0NzY1IiwiZW1haWwiOiJiYW1iYWRvbUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImJHWWRNc0lwcUVudUdhMTZlSEoza0EiLCJuYW1lIjoiU2luZ2dpdCBCcmFtYW50aGEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2lBWlMyUVdvR0ZGN3RSVHlqMFBzTXVFTUVEeUxkUlBLVWdiTThHN1E9czk2LWMiLCJnaXZlbl9uYW1lIjoiU2luZ2dpdCIsImZhbWlseV9uYW1lIjoiQnJhbWFudGhhIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1OTEwMzI2MzUsImV4cCI6MTU5MTAzNjIzNSwianRpIjoiMzM0NGUxMGEwYjY1YWMwZDMwZTZiZTBiNzg0MGJkMTc2MDA4NWIzYSJ9.pcxtpqnsy40Zx89kVvmet6kSjgWCGkFnToPAzu-TZ4Y2fl6-OOxF7iHMgjVgVrCYslQ5qmPjoztZeEedA4QoJ1BLhyhH7o5WI9CIS_ly_-ec68f06QjzA8Cjm3gl8oXeIZSMiGuS2Xxig1XGzxGIblV0lLqR2QoH7FMd6SCA4cHRIO_1Am4cwGBh1z7VhWD0hGcQcYG7lGl9oF9ZjSw4GbQaha_7qA0bNd0YdOurWD7aUW83wzARQVoMWmZd6JEvX3QBjGxvFwDkm708TsFQO90cdZfjGBBrrqqkUcAy0FoYC1FdMiKMI6TOwLuPPHBsm5mBTLrSVBQgnqKLOKV-Yw"