const jwt = require('jwt-simple');

const User = require('../models/User');

const keys = require('../config/keys');
const { response } = require('../helpers/responseHelper');


function tokenForUser(user) {

  const timestamp = new Date().getTime();
  
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.secret);
}

function randomCode(digits) {

	var code = Math.floor(digits + Math.random() * 9000);

	return code;
}

module.exports = {

	signIn: async (req, res, next) => {

		const email = req.body.email;
		
		res.status(200).json({
			token: tokenForUser(req.user),
			data: {
	      		_id: req.user._id,
	      		name: req.user.name,
	      		email: req.user.email
	      	}
		});
	},

	
	signUp: async (req, res, next) => {

		
		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;

	    const newUser = new User({
			name: name,
			email: email,
			password: password,
	    });

	    await newUser.save();

	    res.status(200).json({
	      	token: tokenForUser(newUser),
	      	data: {
	      		_id: newUser._id,
	      		name: newUser.name,
	      		email: newUser.email,
	      	}
	    });
	}
}
