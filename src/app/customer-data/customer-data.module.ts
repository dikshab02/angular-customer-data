import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDataComponent } from './customer-data/customer-data.component';
import { CustomerDataRoutingModule } from './customer-data-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [CustomerDataComponent],
  imports: [
    CommonModule,
    CustomerDataRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class CustomerDataModule {}
