import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerDataService } from '../services/customer-data.service';
import { ICustomerData, IPackData } from 'src/app/models/customer-data';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.scss']
})
export class CustomerDataComponent implements OnInit, OnDestroy {
  customerDataArr: ICustomerData[] = [];
  customerFilteredArr: ICustomerData[] = [];
  searchControl: FormControl<string | null> = new FormControl('');
  subscriptions: Subscription[] = [];

  constructor(private httpCallService: CustomerDataService,
    private logService: LogService) {}

  ngOnInit() {
    this.resetFilteredData();
    this.getCustomerData();
    this.searchIn();
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(s => s.unsubscribe());
  }

  getCustomerData() {
    this.httpCallService.getCustomerData().subscribe({
      next: (response) => {
        this.customerDataArr = response;
        this.customerFilteredArr = this.customerDataArr;
        this.resetFilteredData();
      },
      error: (error) => {
        this.logService.isError(error);
      }
    })
  }

  resetFilteredData() {
    this.customerDataArr.map(cd => cd.filteredPackData = JSON.parse(JSON.stringify(cd.pack_data)))
  }

  searchIn() {
    const subscription: Subscription = this.searchControl.valueChanges.subscribe((searchString)=>{
      this.resetFilteredData();
        if(!searchString)
        {
          this.customerFilteredArr = this.customerDataArr;
          return;
        }

        this.customerFilteredArr = this.customerDataArr.filter((grid_row)=>{
            if(!searchString) return true;
            return this.isFilterable(grid_row, searchString);
        })
    })
    this.subscriptions.push(subscription);
  }

  isFilterable(grid_row: ICustomerData, searchString: string): boolean{
    const isCustomerIdMatching = grid_row.customer_id.toString().indexOf(searchString.toLowerCase()) >= 0;
    grid_row.filteredPackData = isCustomerIdMatching ? grid_row.filteredPackData : grid_row.pack_data.filter((packRow: IPackData)=> this.isPackDataFilterable(packRow, searchString))
    grid_row.filteredPackData = grid_row.filteredPackData ? grid_row.filteredPackData: [];
    return isCustomerIdMatching || grid_row.filteredPackData.length > 0;
  }

  isPackDataFilterable(pack_row: IPackData, searchString: string): boolean {
    return pack_row.ingredient.toLowerCase().indexOf(searchString.toLowerCase()) >= 0
    || pack_row.inventory_code.toLowerCase().indexOf(searchString.toLowerCase()) >= 0;
  }
}
