const router = require('express').Router()
const UserController = require('../controllers/favoriteController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', UserController.getFavorite)
router.get('/most', UserController.getFavoriteMost)
router.post('/', UserController.addFavorite)
router.delete('/:id', UserController.deleteFavorite)

module.exports = router