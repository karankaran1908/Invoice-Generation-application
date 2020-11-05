import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Invoice } from "../models/invoice";

const BASE_URL = "http://localhost:3000/api";
@Injectable({
  providedIn: "root"
})
export class InvoiceService {
  constructor(private httpClient: HttpClient) {}

  //service requests to Crud Operations of invoices
  getInvoices(): Observable<Invoice[]> {
    return this.httpClient.get<Invoice[]>(`${BASE_URL}/invoices`);
  }
  createInvoice(body: Invoice): Observable<Invoice> {
    return this.httpClient.post<Invoice>(`${BASE_URL}/invoices`, body);
  }
  deleteInvoice(id: string): Observable<Invoice> {
    return this.httpClient.delete<Invoice>(`${BASE_URL}/invoices/${id}`);
  }
  getInvoice(id: string): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${BASE_URL}/invoices/${id}`);
  }
  updateInvoice(id: string, body: Invoice) {
    console.log(body)
    return this.httpClient.put<Invoice>(`${BASE_URL}/invoices/${id}`, body);
  }
  downloadInvoice(id: string) {
    return this.httpClient.get(`${BASE_URL}/invoices/${id}/download`, {
      responseType: "blob"
    });
  }
}
