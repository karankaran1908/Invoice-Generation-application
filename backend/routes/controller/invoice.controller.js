import Invoice from '../../models/invoice.model';
import HttpStatus, { NOT_FOUND } from 'http-status-codes';
import Joi from 'joi'
import invoiceService from '../services/invoice.service'

export default {
  findAll(req, res, next) {
    Invoice.find().then(
      invoices => {
        return res.status(200).json(invoices);
      }
    )
  },
  create(req, res) {
    const schema = Joi.object().keys({
      item: Joi.string().required(),
      date: Joi.date().required(),
      due: Joi.date().required(),
      qty: Joi.number().integer().required(),
      tax: Joi.number().required(),
      status: Joi.string().optional(),
      client: Joi.string().optional(),
      rate: Joi.number().optional()
    });
    const { error, value } = Joi.validate(req.body, schema)
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    Invoice.create(value)
      .then(invoice => {
        res.json(invoice)
      })
      .catch(err => res.status(500).json(err))
  },
  findOne(req, res) {
    const { id } = req.params;

    //invoice CRUD operations
    Invoice.findById(id)
      .then(invoice => {
        if (!invoice) {
          return res.status(HttpStatus.NOT_FOUND).json({ err: 'Could not find any invoice' });
        }
        return res.json(invoice);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  delete(req, res) {
    const { id } = req.params;
    Invoice.findByIdAndRemove(id)
      .then(invoice => {
        if (!invoice) {
          return res.status(HttpStatus.NOT_FOUND).json({ err: 'Could not delete any invoice' });
        }
        return res.json(invoice);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  update(req, res) {
    const { id } = req.params;
    const schema = Joi.object().keys({
      item: Joi.string().optional(),
      date: Joi.date().optional(),
      due: Joi.date().optional(),
      qty: Joi.number()
        .integer()
        .optional(),
      tax: Joi.number().optional(),
      rate: Joi.number().optional(),
      client: Joi.string().optional(),
      status: Joi.string().optional()
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    Invoice.findOneAndUpdate({ _id: id }, value, { new: true })
      .then(invoice => res.json(invoice))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  async download(req, res) {
    try {
      const { id } = req.params;
      const invoice = await Invoice.findById(id);
      if (!invoice) {
        return res.status(NOT_FOUND).send({ err: 'could not find any invice' });
      }
      const { subTotal, total } = invoiceService.getTotal(invoice);
      const templateBody = invoiceService.getTemplateBody(invoice, subTotal, total);
      const html = invoiceService.getInvoiceTemplate(templateBody);
      res.pdfFromHTML({
        filename: `${invoice.item}.pdf`,
        htmlContent: html,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
}
