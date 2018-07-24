const passport = require('passport');
const router = require('express-promise-router')();

const passportHelper = require('../helpers/passportHelper');
const authController = require('../controllers/authController');
const pgController = require('../controllers/pgController');
const guestController = require('../controllers/guestController');
const { 
	validateUserOnSignin, 
	validateAddPg, 
	validateUserOnSignup, 
	validateUserId, 
	validateAddGuest, 
} = require('../middlewares/apiMiddleware');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.get('/', (req, res, next) => {
	res.json({
		message: 'PG ROOM API V1'
	});
});

// user app routes
router.post('/register', validateUserOnSignup, authController.signUp);

router.post('/login', requireSignin, authController.signIn);

router.post('/pg', requireAuth, validateAddPg, pgController.store)
	.put('/pg/:id', requireAuth, validateAddPg, pgController.update)
	.get('/pg', requireAuth, pgController.getAll)
	.get('/pg-guest/:id', requireAuth, guestController.getReletedPg)
	.get('/pg/:id', requireAuth, pgController.getPg)
	.get('/pg-detail/:id', requireAuth, pgController.get)
	.delete('/pg/:id', requireAuth, pgController.delete);
	

router.post('/guest', requireAuth, validateAddGuest, guestController.store)
	.get('/guest', requireAuth, guestController.getAll)
	.get('/guest/:id', requireAuth,  guestController.get)
	.put('/guest/:id', requireAuth, validateAddGuest, guestController.update)
	.delete('/guest/:id',  requireAuth, guestController.delete);

// router.get('/pg-guest/:id', requireAuth, guestController.getReletedPg);


module.exports = router;
