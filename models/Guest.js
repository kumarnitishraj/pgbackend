
const mongoose = require('mongoose');
const { Schema } = mongoose;

const guestSchema = new Schema(
	{
		pgId: {type: Schema.Types.ObjectId, ref:'pg'},
		address: String,
		name: String,
		pan:String,
		aadhar:String,
		room_number:Number,
	},
	{
		timestamps: true

	}
);


const Guest = mongoose.model('guest', guestSchema);

module.exports = Guest;
