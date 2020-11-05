import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PaymentService } from "../../services/payment.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"]
})
export class PaymentComponent implements OnInit {
  total:number;
  invoice: Invoice;
  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private invoiceService:InvoiceService,
    private router: Router
  ) {}


  paymentForm = new FormGroup({
    name: new FormControl("", Validators.required),
    cardNumber: new FormControl("", Validators.required),
    expMonth: new FormControl("", Validators.required),
    expYear: new FormControl("", Validators.required)
  });

  //logic for calculating the total amount to be paid
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.invoiceService.getInvoice(params["id"])
      .subscribe(response=>{
        this.invoice =response
        console.log(response)
        if (
          typeof this.invoice.qty !== "undefined" &&
          typeof this.invoice.rate !== "undefined"
        ) {
          this.total = this.invoice.qty * this.invoice.rate;
        }
        let salesTax = 0;
        if (typeof this.invoice.tax !== "undefined") {
          salesTax = (this.total * this.invoice.tax) / 100;
        }
        this.total += salesTax;
        console.log(this.total)
      })
    })
  }

  onSubmit() {
    this.route.params.subscribe(params => {
      this.paymentService
        .addPayment({
          ...this.paymentForm.value,
          invoiceNumber: [params["id"]],
          client:params["clientID"]
        })
        .subscribe(data => {
          this.toastr.success("Payment Successfull");
          if (params["clientID"] != undefined) {
            this.router.navigate([
              "dashboard",
              "payments",
              "history",
              params["clientID"]
            ]);
          } else {
            this.router.navigate(["dashboard", "payments"]);
          }
        });
    });
  }
}
