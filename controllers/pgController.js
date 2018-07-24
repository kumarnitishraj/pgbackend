const PgModel = require('../models/PgRoom');
const Guest = require('../models/Guest');

const { response } = require('../helpers/responseHelper');

module.exports = {

	store: async (req, res, next) => {
		
		const pg_name = req.body.pg_name;
		const address = req.body.address;
		const userId = req.body.userId;

		const newPgModel = new PgModel({
			pg_name,
			address,
			userId
		});
		await newPgModel.save();

		return response(res, newPgModel);
		
	},
	update: async (req, res, next) => {

		const pg_id = req.params.id;
		const pgDetails = req.body;

		await PgModel.findByIdAndUpdate({_id: pg_id}, pgDetails);
		const UpdatedPg = await PgModel.findOne({_id: pg_id});

		return response(res, UpdatedPg);
	},
	getAll: async (req, res, next) => {

		// const userId = req.body.userId;
		const data = await PgModel.find().populate("guest");

		return response(res, data);
	},
	getPg: async (req, res, next) => {

		const userId = req.params.id;
		const data = await PgModel.find({userId});

		return response(res, data);
	},
	get: async (req, res, next) => {

		const pg_id = req.params.id;
		
		const detail = await PgModel.findOne({_id: pg_id});

		return response(res, detail);
	},
	delete : async (req, res, next) => {

		const pgId = req.params.id;

		const deletePg = await PgModel.findByIdAndRemove({_id: pgId});
		if(deletePg){

			const guest = Guest.find({pgId:pgId})
			for(let i=0; i<guest.length; i++){
				await Guest.findByIdAndRemove({_id: guest[i]._id});
			}

			res.status(200).json({
				status:true,
				message: 'Item deleted successfully'
			});

		}

		res.status(400).json({
			status:true,
			message: 'Item not found'
		});
	    
	},
	
}
