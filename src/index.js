const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./controllers/userController');
const medRoutes = require('./controllers/medicationController');
const authRoutes = require('./controllers/authController');
const adminRoutes = require('./controllers/adminController');
const { apiAuthVerification } = require('./security/apiVerification');

const app = express();
const port = process.env.APP_PORT || process.env.PORT;

var corsOptions = {
	origin: true,
	
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
	response.json({ info: 'Node.js, Express, and Postgres API', text: 'pie' });
});

//most routed are beign protested at thsi level with the verification function
//this will check the token passed through ad ensure the system calling the API
//is autheticated

//the auth controller runs the checks inside as the token enpoint is managed by the controller

app.use('/auth', authRoutes);
app.use('/users',apiAuthVerification, userRoutes);
app.use('/medications',apiAuthVerification, medRoutes);
app.use('/admin',apiAuthVerification, adminRoutes);

app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});
