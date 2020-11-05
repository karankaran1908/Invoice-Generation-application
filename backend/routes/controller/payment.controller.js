import Payments from '../../models/payment.model';
import Joi from 'joi'

export default {
//read operation for all payments
  findAll(req, res, next) {
    Payments.find().then(
      data => {
        return res.status(200).json(data);
      }
    )
  },
  findByClientID(req, res, next) {
    Payments.find(req.body.clientID).then(
      data => {
        return res.status(200).json(data);
      }
    )
  },

  //payment validation and create using joi
  create(req, res) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      cardNumber: Joi.string().required(),
      expMonth: Joi.string().required(),
      expYear: Joi.string().required(),
      invoiceNumber: Joi.array().items(Joi.string()).required(),
      client:Joi.string().optional()
    });
    const { error, value } = Joi.validate(req.body, schema)
    if (error && error.details) {
      return res.status(400).json(error)
    }
    Payments.create(value)
      .then(data => {
        res.json(data)
      })
      .catch(err => res.status(500).json(err))
  },
  findOne(req, res) {
    const { id } = req.params;
    Payments.findById(id)
      .then(data => {
        if (!data) {
          return res.status(HttpStatus.NOT_FOUND).json({ err: 'Could not find any Payments' });
        }
        return res.json(data);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  delete(req, res) {
    const { id } = req.params;
    Payments.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          return res.status(HttpStatus.NOT_FOUND).json({ err: 'Could not delete any Payments' });
        }
        return res.json(data);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  update(req, res) {
    const { id } = req.params;
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      cardNumber: Joi.string().required(),
      expMonth: Joi.string().required(),
      expYear: Joi.string().required(),
      invoiceNumber: Joi.array().items(Joi.string()).required()
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    Payments.findOneAndUpdate({ _id: id }, value, { new: true })
      .then(data => res.json(data))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  }
}
