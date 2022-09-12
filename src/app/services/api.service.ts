import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  message: any;

  setMessage(data: any){
    this.message=data
  }
  getMessage(){
    return this.message
  }


  inout: any;

  
  setInOut(data1: any){
    this.inout=data1
  }
  getInOut(){
    return this.inout
  }

  constructor(private http:HttpClient) { }
  postEmployee(data :any){
    return this.http.post<any>("http://localhost:3000/employeeList/",data);
  }
  getEmployee(){
    return this.http.get<any>("http://localhost:3000/employeeList/");
  }

  putEmployee(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/employeeList/"+id,data);

  }
  deleteEmployee(id :number){
   return this.http.delete<any>("http://localhost:3000/employeeList/"+id);
  }
  
}
