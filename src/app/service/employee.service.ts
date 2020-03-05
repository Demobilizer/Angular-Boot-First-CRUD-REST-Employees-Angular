import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  id: number;
  emp: Employee = new Employee(0,"","",0);

  constructor(
    private http:HttpClient
  ) { }

 

  getEmployees() {
    return this.http.get<Array<Employee>>('http://localhost:8080/viewEmployees');
  }

  addEmployee(employee : Employee) {
    //debugger;
    return this.http.post<any>("http://localhost:8080/save", employee);
  }

  deleteEmployee(employee : Employee) {
    //this.id = employee.empid;
    this.emp = employee;
    return this.http.delete("http://localhost:8080/delete/"+employee.empId,{responseType:'text'});
  }

  updateEmployee(employee : Employee) {
    return this.http.put("http://localhost:8080/updateEmployee", employee);
  }

}
