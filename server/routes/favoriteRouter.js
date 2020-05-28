const router = require('express').Router()
const UserController = require('../controllers/favoriteController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', authentication, UserController.getFavorite)
router.get('/most', authentication, UserController.getFavoriteMost)
router.post('/', authentication, UserController.addFavorite)
router.delete('/:id', authentication, authorization, UserController.deleteFavorite)

module.exports = router