const {
	getDocument,
	updateMode,
	createAccess,
	deleteAccess
} = require('../controllers/documentController');
const authenticate = require('../middlewares/authenticate');
const { onlyUser } = require('../middlewares/authorize');

const router = require('express').Router();

router.get('/', getDocument);

router.use(authenticate, onlyUser);

router.post('/', createAccess);

router.patch('/', updateMode);

router.delete('/', deleteAccess);

module.exports = router;
