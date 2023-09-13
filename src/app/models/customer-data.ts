export interface ICustomerData {
  "customer_id" : number;
  "pack_data" : IPackData[];
  "id" : string;
  "filteredPackData"?: IPackData[];
}

export interface IPackData {
  "ingredient": string;
  "inventory_code": string;
  "quantity": number;
  "unit": string;
}
