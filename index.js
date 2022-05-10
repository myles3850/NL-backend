const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./data/controllers/userController");
const medRoutes = require("./data/controllers/medicationController");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.get("/", (request, response) => {
	response.json({ info: "Node.js, Express, and Postgres API", text: "pie" });
});

app.use("/users", userRoutes);
app.use("/medications", medRoutes);

app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});
