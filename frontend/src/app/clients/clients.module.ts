import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormDialogComponent } from "./components/form-dialog/form-dialog.component";
import { ClientService } from "./services/client.service";
import { ClientListingComponent } from "./components/client-listing/client-listing.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "../shared/material.module";
import { HttpClientModule } from "@angular/common/http";

//importing required modules
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [ClientListingComponent, FormDialogComponent],
  exports: [ClientListingComponent],
  providers: [ClientService],
  entryComponents: [FormDialogComponent]
})
export class ClientsModule {}
