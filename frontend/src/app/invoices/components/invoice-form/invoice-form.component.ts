import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { InvoiceService } from "../../services/invoice.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { Invoice } from "../../models/invoice";
import { ClientService } from "src/app/clients/services/client.service";
import { Client } from "src/app/clients/models/client";
@Component({
  selector: "app-invoice-form",
  templateUrl: "./invoice-form.component.html",
  styleUrls: ["./invoice-form.component.scss"]
})
export class InvoiceFormComponent implements OnInit {
  private invoice: Invoice;
  clients: Client[] = [];
  title = "New Invoice";
  constructor(
    private invoiceService: InvoiceService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {}
  invoiceForm = new FormGroup({
    item: new FormControl("", Validators.required),
    date: new FormControl("", Validators.required),
    due: new FormControl("", Validators.required),
    qty: new FormControl("", Validators.required),
    client: new FormControl("", Validators.required),
    rate: new FormControl(""),
    tax: new FormControl("", Validators.required)
  });

  ngOnInit() {
    this.setInvoiceToForm();
    this.setClients();
  }

  //invoice for onsubmission create form
  onSubmit() {
    if (this.invoice) {
      this.invoiceService
        .updateInvoice(this.invoice._id, this.invoiceForm.value)
        .subscribe(
          data => {
            this.toastr.success("Invoice Updated", data.item);
            this.router.navigate(["dashboard", "invoices"]);
          },
          err => this.errorHandler("Failed to update invoice", err)
        );
    } else {
      this.invoiceService.createInvoice(this.invoiceForm.value).subscribe(
        data => {
          this.invoiceForm.reset();
          this.toastr.success("Invoice Added", data.item);
          this.router.navigate(["dashboard", "invoices"]);
        },
        err => this.errorHandler("Invoice creation failed", err)
      );
    }
  }
  private setInvoiceToForm() {
    //get the id of the invoice
    this.route.params.subscribe(params => {
      let id = params["id"];
      if (!id) {
        return;
      }
      this.title = "Edit Invoice";
      this.route.data.subscribe((data: { invoice: Invoice }) => {
        this.invoice = data.invoice;
        this.invoiceForm.patchValue({
          item: this.invoice.item,
          qty: this.invoice.qty,
          date: this.invoice.date,
          due: this.invoice.due,
          rate: this.invoice.rate,
          client: this.invoice.client,
          tax: this.invoice.tax
        });
      });
    });
  }

  //setting the clientds details on to the form
  private setClients() {
    this.clientService.getClients().subscribe(
      clients => {
        this.clients = clients;
      },
      err => this.errorHandler(err, "Failed to get Clients")
    );
  }
  errorHandler(type, error) {
    this.toastr.error(type, error);
  }
}
