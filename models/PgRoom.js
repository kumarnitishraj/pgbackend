const mongoose = require('mongoose');
const { Schema } = mongoose;

const pgRoomSchema = new Schema(
	{
		pg_name: String,
		address: String,
		room_capacity:Number, 
		userId: {type: Schema.Types.ObjectId, ref:'users'},
	},
	{
		timestamps: true
	}
);

const PgModel = mongoose.model('pg', pgRoomSchema);

module.exports = PgModel;
