
const { Favorite, User } = require('../models')

class FavoriteController {
    static addFavorite(req, res) {
        let newFavorite = {
            recipeId: req.body.recipeId,
            title: req.body.title,
            ready: req.body.ready,
            serving: req.body.serving,
            image: req.body.image,
            UserId: req.userdata.id
        }
        Favorite.findOne({ where: { recipeId: req.body.recipeId, UserId: req.userdata.id } })
            .then(data => {
                if (data) {
                    res.status(400).json({ message: 'this is already in your favorite' })
                } else {
                    return Favorite.create(newFavorite)
                }
            })
            .then(result => {
                res.status(201).json({ message: 'Success added a new favorite', favorite: newFavorite })
            })
            .catch(err => {
                res.status(500).json({ message: `internal server error`, error: err })
            })
    }


    static getFavorite(req, res) {
        let id = Number(req.userdata.id)
        Favorite.findAll({ where: { UserId: id } })
            .then(result => {
                res.status(200).json({ message: 'success retrieved your favorites', favorites: result })
            })
            .catch(err => {
                res.status(500).json({ message: `internal server error`, error: err })
            })
    }

    static getFavoriteMost(req, res) {
        Favorite.findAll()
            .then(data => {
                let hasil = []
                for (let i = 0; i < data.length; i++) {
                    let flag = false
                    for (let j = 0; j < hasil.length; j++) {
                        if (data[i].recipeId == hasil[j][0].recipeId) {
                            hasil[j][1].total++
                            flag = true
                        }
                    }
                    if (flag == false) {
                        hasil.push([data[i].dataValues, { total: 1 }])
                    }
                }
                hasil.sort(function (a, b) { return b[1].total - a[1].total })
                console.log(hasil)
                res.status(200).json({ mostFavorite: hasil[0] })
            })
            .catch(err => {
                res.status(500).json({ message: `internal server error`, error: err })
            })
    }

    static deleteFavorite(req, res) {
        let id = Number(req.params.id)
        Favorite.findOne({ where: { id } })
            .then(data => {
                if (!data) {
                    res.status(404).json({ status: 404, message: `favorite not found` })
                } else {
                    return Favorite.destroy({ where: { id } })
                }
            })
            .then(result => {
                res.status(200).json({ message: 'success deleted a favorite' })
            })
            .catch(err => {
                res.status(500).json({ message: `internal server error`, error: err })
            })
    }
}

module.exports = FavoriteController