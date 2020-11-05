import { Component, OnInit, ViewChild } from "@angular/core";
import { InvoiceService } from "../../services/invoice.service";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { Invoice } from "../../models/invoice";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { remove } from "lodash";
import { PaymentService } from '../../services/payment.service';
@Component({
  selector: "app-invoice-listing",
  templateUrl: "./invoice-listing.component.html",
  styleUrls: ["./invoice-listing.component.scss"]
})
export class InvoiceListingComponent implements OnInit {
  displayedColumns: string[] = [
    "item",
    "date",
    "due",
    "qty",
    "rate",
    "tax",
    "status",
    "action"
  ];
  dataSource = new MatTableDataSource<Invoice>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private toaster: ToastrService,
    private paymentService:PaymentService
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.invoiceService.getInvoices().subscribe(
      data => {
        this.dataSource.data = data;
      },
      err => {
        console.error(err);
      }
    );
  }
  newInvoice() {
    this.router.navigate(["dashboard", "invoices", "new"]);
  }
  editBtnHandler(id) {
    this.router.navigate(["dashboard", "invoices", id]);
  }
  //sending invoice to clients
  sendInvoice(invoice){
    invoice["status"] = "sent"
    let id = invoice._id
    delete invoice._id
    delete invoice.__v;
    this.paymentService.sendInvoice(id)
    .subscribe(response=>{
      console.log(response)
      this.invoiceService.updateInvoice(id,invoice)
      .subscribe( data => {
          this.toaster.success("Invoice sent to the client", data.item);
        },
        err => {
          console.error(err);
        })
    })

  }
  //delete action for invoices
  deleteBtnHandler(id) {
    this.invoiceService.deleteInvoice(id).subscribe(
      data => {
        const removedItems = remove(this.dataSource.data, item => {
          return item._id === data._id;
        });
        this.dataSource.data = [...this.dataSource.data];
        this.toaster.success("Invoice deleted", data.item);
      },
      err => this.toaster.success("Failed to delete", err)
    );
  }
}
