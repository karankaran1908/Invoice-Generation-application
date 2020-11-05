import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { FormsModule } from "@angular/forms";
import { DashboardModule } from "./dashboard/dashboard.module";
import { MaterialModule } from "./shared/material.module";
import { InvoicesModule } from "./invoices/invoices.module";

@NgModule({
  declarations: [AppComponent, SignupComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    InvoicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}