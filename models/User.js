const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		email: {type: String, lowercase: true},
		password: String,
		name: String,
		
	},
	{
		timestamps: true
	}
);

//on save hook
userSchema.pre('save', function(next) {
    const user = this;

    if(this.method!='local' && this.password==undefined) {
    	next();
    }

    bcrypt.genSalt(10, function(err, salt) {
	    if (err) { return next(err); }

	    bcrypt.hash(user.password, salt, null, function(err, hash) {
	        if (err) { return next(err); }

	        user.password = hash;
	        next();
	    });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

const User = mongoose.model('users', userSchema);

module.exports = User;
