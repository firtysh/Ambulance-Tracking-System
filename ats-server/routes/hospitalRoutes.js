const router = require('express').Router();
const hospitalController = require('../controllers/hospitalController')

router.get('/',hospitalController.getHospitals)

module.exports = router;