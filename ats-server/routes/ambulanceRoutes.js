const router = require('express').Router();
const ambulanceController = require('../controllers/ambulanceController');
const verifyToken = require('../middleware/verifyToken');

router.get('/',ambulanceController.getAmbulances)
router.post('/updatelocation',verifyToken,ambulanceController.updateLocation)

module.exports = router;