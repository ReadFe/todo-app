const router = require('express').Router();
const dataController = require('./controller')

router.get('/task', dataController.index);
router.post('/task', dataController.store);
router.put('/task/:id', dataController.update);
router.delete('/task/:id', dataController.destroy);


module.exports = router;