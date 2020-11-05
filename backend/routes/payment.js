import express from 'express';
import paymentController from './controller/payment.controller';

const router = express.Router();
//routes for payments
router.get('/', paymentController.findAll);
router.get('/filter/:id', paymentController.findByClientID);
router.get('/:id', paymentController.findOne);
router.delete('/:id', paymentController.delete);
router.put('/:id', paymentController.update);
router.post('/', paymentController.create);

module.exports = router;
