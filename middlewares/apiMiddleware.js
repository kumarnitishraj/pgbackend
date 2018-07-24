const User = require('../models/User');
const { 
	badRequestSU, 
	badRequestAddPG, 
	badRequestSI, 
	userExist, 
	userNotRegistered,
	badRequestUId,
	frobidden,
	badRequestAddGuest
} = require('../helpers/responseHelper');

module.exports = {
	
	validateUserOnSignup: async (req, res, next) => {

		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;
		
		if(!email || !password || !name ) {
			return next(badRequestSU());
		}

		const existingUser = await User.findOne({email: email.toLowerCase()});
		if(existingUser) {
			return next(userExist());
		}

		return next();
	},

	validateUserId: async (req, res, next) => {

		const userId = req.body.userId;
		
		if(!userId) {
			return next(badRequestUId());
		}

		return next();
	},


	validateUserOnSignin: async (req, res, next) => {

		const email = req.body.email;
		const password = req.body.password;

		if(!email || !password) {
			return next(badRequestSI());
		}

		const user = await User.findOne({email: email.toLowerCase()});

		if(!user) {
			return next(userNotRegistered());
		}

		return next();
	},
	validateAddPg: async (req, res, next) => {


		const pg_name = req.body.pg_name;
		const address = req.body.address;
		const userId = req.body.userId;

		if(!pg_name || !address || !userId ) {
			return next(badRequestAddPG());
		}

		return next();
	},
	validateAddGuest: async (req, res, next) => {

		const pgId = req.body.pgId;
		const address = req.body.address;
		const name = req.body.name;
		const pan = req.body.pan;
		const aadhar = req.body.aadhar;

		if(!pgId || !address || !name || !pan || !aadhar) {
			return next(badRequestAddGuest());
		}

		return next();
	},

}
