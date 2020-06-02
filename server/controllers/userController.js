const { User } = require("../models");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static loginUser(req, res) {
    let { email, password } = req.body;

    User.findOne({
      where: { email }
    })
      .then(data => {
        if (!data) {
          res.status(404).json({ message: "Email not registered" });
        } else {
          if (bcrypt.compareSync(password, data.password)) {
            let token = jwt.sign(
              { id: data.id, email: data.email },
              process.env.SECRET
            );
            res
              .status(200)
              .json({ name: data.name, avatar: data.avatar, token });
          } else {
            res.status(400).json({ message: "Wrong password" });
          }
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Internal server error" });
      });
  }

  static registerUser(req, res) {
    const { name, email, password, avatar } = req.body;
    console.log(email);
    console.log(password);
    User.findOne({
      where: { email }
    })
      .then(data => {
        if (data) {
          throw new Error({ message: "Email already taken" });
        } else {
          return User.create({
            name,
            email,
            password,
            avatar
          });
        }
      })
      .then(data2 => {
        let token = jwt.sign(
          { id: data2.id, email: data2.email },
          process.env.SECRET
        );
        res.status(201).json({ name, avatar, token, id: data2.id });
      })
      .catch(err => {
        if (err.message) {
          res.status(400).json({ message: "Email already taken" });
        } else {
          res.status(500).json({ message: "Internal server error" });
        }
      });
  }

  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.GOOGLE_SIGN_KEY);
    let user = {};
    let status = false;
    client
      .verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.GOOGLE_SIGN_KEY
      })
      .then(ticket => {
        const payload = ticket.getPayload();
        user = {
          name: payload.given_name,
          email: payload.email,
          password: process.env.DEFAULT_PASSWORD,
          avatar: payload.picture
        };
        return User.findOne({ where: { email: user.email } });
      })
      .then(userdata => {
        if (userdata) {
          let token = jwt.sign(
            { id: userdata.id, email: userdata.email },
            process.env.SECRET
          );
          status = true;
          res
            .status(200)
            .json({ name: userdata.name, avatar: userdata.avatar, token });
        } else {
          console.log(`masuk ke create`)
          return User.create(user);
        }
      })
      .then(result => {
        if (!status) {
          let token = jwt.sign(
            { id: result.id, email: result.email },
            process.env.SECRET
          );
          res.status(201).json({ name: result.name, avatar: result.avatar, token });
        }
      })
      .catch(err => {
        if (err) {
          next(err);
        } else {
          next({ status: 400, message: `Failed` });
        }
      });
  }

  static getUser(req, res) {
    const id = req.params.id
    User.findOne({
      where: { id }
    })
      .then(result => {
        if (result) {
          let temp = {
            name: result.name,
            email: result.email,
            avatar: result.avatar
          }
          res.status(200).json({ theUser: temp, message: 'Success retrieved logged in user data' })

        } else {
          res.status(404).json({ message: 'User not found' })
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Internal Server Error' })
      })
  }

  static editUser(req, res) {
    const id = req.params.id
    const obj = {
      name: req.body.name,
      email: req.body.email,
      avatar: req.body.avatar,
    }
    User.findOne({
      where: { id }
    })
      .then(result => {
        if (!result) {
          res.status(404).json({ message: 'User not found' })

        } else {
          return User.update(obj, {
            where: { id }
          })
        }
      })
      .then(data => {
        res.status(200).json({ message: 'Success edit a user', editedData: obj })
      })
      .catch(err => {
        res.status(500).json({ message: 'Internal server error' })
      })
  }
}

module.exports = UserController;
