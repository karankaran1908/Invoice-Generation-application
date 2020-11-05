export default {
    //calculation of total amount to be paid
    getTotal(invoice) {
      let total = 0;
      let subTotal = 0;
  
      if (typeof invoice.qty !== 'undefined' && typeof invoice.rate !== 'undefined') {
        total = invoice.qty * invoice.rate;
      }
      let salesTax = 0;
      if (typeof invoice.tax !== 'undefined') {
        salesTax = total * invoice.tax / 100;
      }
      subTotal = total + salesTax;
      return { total, subTotal };
    },
    getTemplateBody(invoice, subTotal, total) {
      const templateBody = `
        <div class="container">
      <div class="row">
          <div class="col-xs-6">
          </div>
          <div class="col-xs-6 text-right">
              <h1>INVOICE</h1>
              <h1>
                  <small>${invoice.item}</small>
              </h1>
          </div>
      </div>
      <table class="table table-bordered">
          <thead>
              <tr>
                  <th>
                      <h4>Qty</h4>
                  </th>
                  <th>
                      <h4>Rate</h4>
                  </th>
                  <th>
                      <h4>Tax</h4>
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>${invoice.qty}</td>
                  <td>${invoice.rate}</td>
                  <td>
                      ${invoice.tax}
                  </td>
              </tr>
          </tbody>
      </table>
      <div class="row text-right">
          <div class="col-xs-2 col-xs-offset-8">
              <p>
                  <strong>
                      Sub Total :
                      <br> TAX :
                      <br> Total :
                      <br>
                  </strong>
              </p>
          </div>
          <div class="col-xs-2">
              <strong>
                  $${subTotal}
                  <br> $${invoice.tax}
                  <br> $${total}
                  <br>
              </strong>
          </div>
      </div>
    </div>
        `;
      return templateBody;
    },
  
    //pdf generation of invoice template
    getInvoiceTemplate(templateBody, subTotal, total) {
      const html = `
        <html>
        <head>
        <title> Invoice </title>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
         <style>
         @import url(http://fonts.googleapis.com/css?family=Bree+Serif);
         body, h1, h2, h3, h4, h5, h6{
         font-family: 'Bree Serif', serif;
         }
         </style>
        </head>
        <body>
           ${templateBody}
        </body>
        </html>
        `;
      return html;
    },
  };
