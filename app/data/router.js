const router = require('express').Router();
const dataController = require('./controller')

router.get('/', dataController.index);
router.post('/post', dataController.store);
router.put('/put/:id', dataController.update);
router.delete('/delete/:id', dataController.destroy);


module.exports = router;