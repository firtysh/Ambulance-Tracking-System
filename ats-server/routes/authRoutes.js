const router = require('express').Router();

const signupController = require('../controllers/authControllers/signupController');
const signinController = require('../controllers/authControllers/signinController');

router.post('/signup/user', signupController.userSignup);
router.post('/signup/hospital', signupController.hospitalSignup);
router.post('/signup/ambulance', signupController.ambulanceSignup);
router.post('/signin/user', signinController.userSignin);
router.post('/signin/hospital', signinController.hospitalSignin);
router.post('/signin/ambulance', signinController.ambulanceSignin);

module.exports = router;