import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  isError(error: any) {
    console.log("error",error.message)
  }

  isSuccess(){

  }
}
