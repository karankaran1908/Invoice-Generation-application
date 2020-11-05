import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { Payment } from "../../models/payment";
import { PaymentService } from "../../services/payment.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-payment-history",
  templateUrl: "./payment-history.component.html",
  styleUrls: ["./payment-history.component.scss"]
})
export class PaymentHistoryComponent implements OnInit {
  displayedColumns: string[] = ["name", "cardNumber", "expMonth", "expYear"];
  dataSource = new MatTableDataSource<Payment>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["clientID"] != undefined) {
        this.dataSource.paginator = this.paginator;
        this.paymentService.getAllPayments().subscribe(
          data => {
            console.log(data);
//filtering payments for particular payments
            this.dataSource.data = data.filter(o=>{
             return o.client ==params["clientID"]
            });
          },
          err => {
            console.error(err);
          }
        );
      }else{
        this.dataSource.paginator = this.paginator;
        this.paymentService.getAllPayments().subscribe(
          data => {
            console.log(data);
            this.dataSource.data = data;
          },
          err => {
            console.error(err);
          }
        );
      }
    });

  }
}
