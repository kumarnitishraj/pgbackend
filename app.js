const express = require('express');
const http = require('http');

const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const keys = require('./config/keys');
const { notFound } = require('./helpers/responseHelper');

//express instance
const app = express();

//app DB setup
mongoose.Promise = global.Promise;
// console.log(keys.mongoURI)
mongoose.connect(keys.mongoURI,{ useNewUrlParser: true });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//app root route
app.get('/', (req, res, next) => {
	res.send('Greetings ROOM PG');
});

//app api routes
app.use('/api/v1', require('./routes/api'));


//catch invalid URL
app.use((req, res, next) => {
	return next(notFound());
});

//catch app errors
app.use((err, req, res, next) => {
	const error = err;
	const status = err.status || 500;

	res.status(status).json({
		error: {
			message: error.message
		}
	});

	// console.log(err);
});



//app server setup
const port = process.env.PORT || 8080;
const serverHttp = http.createServer(app);
serverHttp.listen(port);

