const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./controllers/userController');
const medRoutes = require('./controllers/medicationController');
const authRoutes = require('./controllers/authController');
const adminRoutes = require('./controllers/adminController');

const app = express();
const port = process.env.APP_PORT || process.env.PORT;

var whitelist = process.env.CORS_APPROVED_ADDRESSES;
var corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
	response.json({ info: 'Node.js, Express, and Postgres API', text: 'pie' });
});

app.use('/users', userRoutes);
app.use('/medications', medRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});
