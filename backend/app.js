import InvoiceRoutes from './routes/invoice'
import PaymentRoutes from './routes/payment'
import GlobalMiddlware from './global.middleware'
import UserRoutes from './routes/user'
import express from 'express'
import { clientRouter } from './routes/client';
import userController from '../backend/routes/controller/user.controller'

const mongoose = require("mongoose")
const app = express();
//mongodb connection string
mongoose.connect("mongodb+srv://danny:UPEF29Z83FHESRV5@testdb-k3vwo.gcp.mongodb.net/test?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(() => {
  console.log('Connected to DB!')
}).catch(err => {
  console.log(`DB Connection Error: ${err.message}`);
});

//controllers unified at these routes
app.use(GlobalMiddlware)
app.use('/api/clients', clientRouter)
app.use("/api/users", UserRoutes)
app.post('/api/send/:id', userController.sendInvoice);
app.use("/api/invoices", InvoiceRoutes)
app.use("/api/payments", PaymentRoutes)

module.exports = app;
