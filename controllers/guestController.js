const PgModel = require('../models/PgRoom');
const Guest = require('../models/Guest');

const { response } = require('../helpers/responseHelper');

module.exports = {

	store: async (req, res, next) => {
		
		const pgId = req.body.pgId;
		const address = req.body.address;
        const pan = req.body.pan;
        const aadhar = req.body.aadhar;
		const name = req.body.name;

		const newGuest = new Guest({
			name,
			address,
            pan,
            aadhar,
            pgId
		});
		await newGuest.save();

		return response(res, newGuest);
		
	},
	update: async (req, res, next) => {

		const guest_id = req.params.id;
		const guestDetails = req.body;

		await Guest.findByIdAndUpdate({_id: guest_id}, guestDetails);
		const UpdatedGuest = await Guest.findOne({_id: guest_id});

		return response(res, UpdatedGuest);
	},

	get: async (req, res, next) => {

		const guest_id = req.params.id;
		const data = await Guest.findOne({_id: guest_id});

		return response(res, data);
	},

	getAll: async (req, res, next) => {

		// const userId = req.body.userId;
		const data = await Guest.find({});

		return response(res, data);
	},

	getReletedPg: async (req, res, next) => {
		
		const pgId = req.params.id;
		const pgInstance = await Guest.find({pgId});

		if(pgInstance){

			return response(res, pgInstance)
		}

		res.status(400).json({
			status:true,
			message: 'Item not found'
		});
	    
	},
	
	delete : async (req, res, next) => {
		
		const guestId = req.params.id;
		const deleteGuest = await Guest.findByIdAndRemove({_id: guestId});

		if(deleteGuest){
			
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
