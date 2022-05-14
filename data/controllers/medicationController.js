const express = require("express");
const db  = require('../medication/medicationsQueries');

var medRoutes = express.Router();

//this controller is responsable for all the routes needed for the medication endpoints. the endpints are grouped by url

medRoutes.get("/", db.getUsersMedications);
medRoutes.post('/', db.createNewMedication);

medRoutes.get('/:medicationId', db.getMedicationDetails)

module.exports = medRoutes;