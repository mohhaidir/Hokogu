const { User } = require("../models")
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static loginUser(req, res) {
        let { email, password } = req.body
        User.findOne({
            where: { email }
        })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: `email not registered` })
                } else {
                    if (bcrypt.compareSync(password, data.password)) {
                        console.log(`di sini brohhhhh`)
                        let token = jwt.sign({ id: data.id, email: data.email }, process.env.SECRET);
                        res.status(200).json({ name: data.name, avatar: data.avatar, token })
                    } else {
                        res.status(400).json({ message: `wrong password` })
                    }
                }
            })
            .catch(err => {
                res.status(500).json({ message: `internal server error` })
            })
    }

    static registerUser(req, res) {
        const { name, email, password, avatar } = req.body
        User.findOne({
            where: { email }
        })
            .then(data => {
                if (data) {
                    console.log(`masuk sini oooi 2222`)
                    res.status(400).json({ message: `email already taken` })
                } else {
                    console.log(`masuk sini oooi`)
                    return User.create({
                        name, email, password, avatar
                    })
                }
            })
            .then(data2 => {
                let token = jwt.sign({ id: data2.id, email: data2.email }, process.env.SECRET);
                res.status(201).json({ name, avatar, token })
            })
            .catch(err => {
                console.log(`masuk sini`)
                res.status(500).json({
                    
                    message: "Internal server error",
                });
            })
    }

    static googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.GOOGLE_SIGN_KEY);
        let user = {}
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.GOOGLE_SIGN_KEY,
        })
            .then(ticket => {
                const payload = ticket.getPayload();
                user = {
                    name: payload.given_name,
                    email: payload.email,
                    password: process.env.DEFAULT_PASSWORD,
                    avatar: payload.picture
                }
                return User.findOne({ where: { email: user.email } })
            })
            .then(userdata => {
                if (userdata) {
                    let token = jwt.sign({ id: userdata.id, email: userdata.email }, process.env.JWT_SECRET)
                    res.status(200).json({ name: userdata.name, avatar: userdata.avatar, token })
                } else {
                    return User.create(user)
                }
            })
            .then(result => {
                let token = jwt.sign({ id: result.id, email: result.email }, process.env.JWT_SECRET)
                res.status(200).json({ name, avatar, token })
            })
            .catch(err => {
                if (err) {
                    next(err)
                } else {
                    next({ status: 400, message: `Failed` })
                }
            })
    }
}

module.exports = UserController