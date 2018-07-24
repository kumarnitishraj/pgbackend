module.exports = {
    
    response:(res ,data) => {
        res.status(200).json({
            message: 'query was successfull',
            data
        });
    },

    frobidden: (next) => {
        const err = new Error('you do not have access');
            err.status = 403;
            return err;
    },

    badRequestSU: (next) => {
        const err = new Error('required fields: name, email, password, deviceId.');
            err.status = 400;
            return err;
    },

    badRequestAddPG: (next) => {
        const err = new Error('required fields: Pg Name, Address. userId, room_capacity');
            err.status = 400;
            return err;
    },

    badRequestSI: (next) => {
        const err = new Error('please provide email and password.');
            err.status = 400;
            return err;
    },

    notFound: (next) => {
        const err = new Error('url not found please check the documentation.');
            err.status = 404;
            return err;
    },

	userNotFound: (next) => {
		const err = new Error('user not found');
			err.status = 404;
            return err;
	},

    userNotRegistered: (next) => {
        const err = new Error('email not found please register.');
            err.status = 404;
            return err;
    },

    userExist: (next) => {
        const err = new Error('email address already in use');
            err.status = 400;
            return err;
    },
    
    //app specific
	badRequestUId: (next) => {
		const err = new Error('please provide userID');
			err.status = 404;
            return err;
	},

	userExistInList: (next) => {
		const err = new Error('this user is already in your list');
			err.status = 400;
            return err;
	},

    badRequestAddGuest: (next) => {
        const err = new Error('Require Fileds: pgId, name, address, pan, aadhar');
            err.status = 400;
            return err;
    },

    resetEmailRequired: (next) => {
        const err = new Error('required fields: pgId, name, pan, aadhar, address.');
            err.status = 400;
            return err;
    },

    resetEmailNotFound: (next) => {
        const err = new Error('please provide registered email address.');
            err.status = 404;
            return err;
    },

    resetCodeRequired: (next) => {
        const err = new Error('please provide the reset code sent to your mail');
            err.status = 400;
            return err;
    },

    resetCodeNotValid: (next) => {
        const err = new Error('password reset code is invalid or has expired.');
            err.status = 400;
            return err;
    },

    resetPasswordRequired: (next) => {
        const err = new Error('please provide password.');
            err.status = 400;
            return err;
    },

    resetPasswordFacebookUser: (next) => {
        const err = new Error('please reset your password or login with facebook.');
            err.status = 401;
            return err;
    },

    //admin
    newEventRequiredFileds: (next) => {
        const err = new Error('required fields: name, location, dateTime');
            err.status = 400;
            return err;
    },

    eventNotFound: (next) => {
        const err = new Error('event not found.');
            err.status = 404;
            return err;
    },

    devicesRequiredFields: (next) => {
        const err = new Error('required fields: name, location');
            err.status = 404;
            return err;
    },

    deviceNotFound: (next) => {
        const err = new Error('this devide not found or has been deleted.');
            err.status = 404;
            return err;
    }
}
