const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

global.__root = __dirname + '/server/';
var activosRouter = require('./server/routes/activos');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/activos',activosRouter);

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200)
	.send({
		message: 'Welcome to the beginning of nothingness.'
	})
);

module.exports = app;