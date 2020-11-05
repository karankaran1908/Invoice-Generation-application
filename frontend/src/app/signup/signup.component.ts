import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  //signup user
  onSignUp(signUpForm: NgForm) {
    if (signUpForm.invalid) {
      return;
    }
    this.authService
      .createUser(signUpForm.value.email, signUpForm.value.password)
      .subscribe(response => {
        if (response["message"] == "user created") {
          this.router.navigate(["Login"]);
          this.toastr.success("Sign Up successfull", signUpForm.value.email);
        }
      });
  }
}
