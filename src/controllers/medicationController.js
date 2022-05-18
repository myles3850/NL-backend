const express = require("express");
const medicationsService  = require('../services/medications');

var medRoutes = express.Router();

//this controller is responsable for all the routes needed for the medication endpoints. the endpints are grouped by url
medRoutes.get("/", medicationsService.getUsersMedications);
medRoutes.post('/', medicationsService.createNewMedication);

medRoutes.get('/:medicationId', medicationsService.getMedicationDetails)

module.exports = medRoutes;
