const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./controllers/userController');
const medRoutes = require('./controllers/medicationController');
const authRoutes = require('./controllers/authController');

const app = express();
const port = process.env.APP_PORT || process.env.PORT;

app.use(
	cors({
		origin: ['http://localhost:4000'],
	})
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
	response.json({ info: 'Node.js, Express, and Postgres API', text: 'pie' });
});

app.use("/users", userRoutes);
app.use("/medications", medRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});
