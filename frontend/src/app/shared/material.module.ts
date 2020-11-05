import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatMenuModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatOptionModule,
  MatSelectModule,
  MatDialogModule,
  MatProgressSpinnerModule
} from "@angular/material";
import { MatIconModule } from "@angular/material/icon";

const exportedMatModule = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatMenuModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatOptionModule,
  MatSelectModule,
  MatDialogModule,
  MatProgressSpinnerModule
];
@NgModule({
  declarations: [],
  imports: [CommonModule, ...exportedMatModule],
  exports: [...exportedMatModule]
})
export class MaterialModule {}
