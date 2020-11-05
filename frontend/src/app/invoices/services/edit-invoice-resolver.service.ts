import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Invoice } from "../models/invoice";
import { InvoiceService } from "./invoice.service";
import { take, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()

//resolver services on going on to a particular route brings the common data that can be reused
export class EditInvoiceResolverService implements Resolve<Invoice> {
  constructor(private invoiceService: InvoiceService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Invoice> {
    let id = route.paramMap.get("id");
    return this.invoiceService.getInvoice(id).pipe(
      take(1),
      map(invoice => {
        if (invoice) {
          return invoice;
        } else {
          this.router.navigate(["/dashboard", "invoices"]);
          return null;
        }
      })
    );
  }
}
