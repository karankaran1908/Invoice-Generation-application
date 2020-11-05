import mongoose from 'mongoose';

const Schema = mongoose.Schema;


//schema of invoice generation
const InvoiceSchema = new Schema({
  item: {
    type: String,
    required: true,
  },
  qty: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  due: {
    type: String,
    required: true,
  },
  rate: {
    type: String
  },
  status: {
    type: String
  },
  tax: {
    type: String,
    required: true,
  },
  client: {
    ref: 'Client',
    type: Schema.Types.ObjectId
  },
})

export default mongoose.model('Invoice', InvoiceSchema)
