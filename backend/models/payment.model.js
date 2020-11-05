import mongoose from 'mongoose';

const Schema = mongoose.Schema;

//schema of payment
const PaymentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  expMonth: {
    type: String,
    required: true,
  },
  expYear: {
    type: String,
    required: true,
  },
  invoiceNumber: {
    type: Array,
    required: true
  },
  client: {
    type: String,
  }
})

export default mongoose.model('Payment', PaymentSchema)
