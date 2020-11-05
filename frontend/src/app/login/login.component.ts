import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  private clientID: string = "";
  private invoiceID: string = "";
  constructor(
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clientID = params["clientID"];
      this.invoiceID = params["invoiceID"];
    });
  }

  //authentication logic for login functionality
  onLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    this.authService
      .login(loginForm.value.email, loginForm.value.password)
      .subscribe(response => {
        if (!(this.invoiceID == "" || this.invoiceID == undefined)) {
          this.router.navigate([
            "dashboard",
            "invoices",
            this.invoiceID,
            "pay",
            this.clientID
          ]);
        } else if (response["token"] !== undefined) {
          this.router.navigate(["dashboard"]);
          console.log(response);
        } else {
          this.toastr.success(
            "Authentication Error",
            "Incorrect user name or password"
          );
        }
      });
  }
}
