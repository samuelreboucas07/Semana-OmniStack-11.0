const express = require('express');

const OngsController = require('../controllers/OngsController');
const IncentsController = require('../controllers/IncidentController');
const ProfileController = require('./../controllers/ProfileController');
const SessionController = require('./../controllers/SessionController');

const router = express.Router()

router.post('/create_ong', OngsController.create);
router.get('/get_ongs', OngsController.getOngs);

router.post('/create_incident', IncentsController.create);
router.get('/get_all_incidents', IncentsController.getAllIncidents);
router.delete('/delete_incident/:id', IncentsController.delete);

router.get('/get_incidents_ong', ProfileController.getIncidentOng);

router.post('/sessions', SessionController.create);

module.exports = router;