import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InvoiceListingComponent } from "./components/invoice-listing/invoice-listing.component";
import { MaterialModule } from "../shared/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { InvoiceService } from "./services/invoice.service";
import { InvoiceFormComponent } from "./components/invoice-form/invoice-form.component";
import { ToastrModule } from "ngx-toastr";
import { InvoiceViewComponent } from "./components/invoice-view/invoice-view.component";
import { EditInvoiceResolverService } from "./services/edit-invoice-resolver.service";
import { RouterModule } from "@angular/router";
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';
import { PaymentService } from './services/payment.service';

//import required modules here
@NgModule({
  declarations: [
    InvoiceListingComponent,
    InvoiceFormComponent,
    InvoiceViewComponent,
    PaymentComponent,
    PaymentHistoryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: "toast-top-right",
      preventDuplicates: true
    })
  ],
  exports: [InvoiceListingComponent, InvoiceFormComponent],
  providers: [InvoiceService, EditInvoiceResolverService,PaymentService]
})
export class InvoicesModule {}
