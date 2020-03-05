import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee'
import { EmployeeService } from '../service/employee.service';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent implements OnInit {
  

  constructor(
    private employeeService: EmployeeService,
    public userService: UserService
  ) { }

  employees: Array<Employee>;
  delSuccessMsg: any;
  inEdit = false;
  successMsg: any;

  ngOnInit() {
    console.log('coming to view......');
    let res = this.employeeService.getEmployees();
    res.subscribe((data)=>{
      console.log("success data: "+data);
      this.employees = data;
      
    },(err)=>{
      //debugger;
      console.log(JSON.stringify(err));
      
    });
  }

  deleteEmployee(emp : Employee) {
    this.employeeService.deleteEmployee(emp).subscribe((data)=>{
      
      // following one line also works, if we returns the result of remaining from controller, BUT
        // it consumes one more database operation!!

      // this.employees = data;
      
      if(data==="success") {
        let currEmp=this.employees.find((empl)=>{
          return empl.empId== emp.empId;
        });
        console.log("index number is : "+this.employees.indexOf(currEmp));
        this.employees.splice(this.employees.indexOf(currEmp),1);
      }
    },(err)=>{
      console.log(JSON.stringify(err));
    });
    this.successMsg="";
    this.delSuccessMsg = "Employee deleted successfully!";
  }

   changeEmpShow(emp:Employee, show:boolean) {
      show = !show;
      let currEmp=this.employees.find((empl)=>{
        return empl.empId== emp.empId;
      });
   }

   change(emp:Employee){
     
      emp.isEdit=!emp.isEdit;
      this.inEdit=!this.inEdit;
   }

   updateEmployee(emp:Employee) {
     this.employeeService.updateEmployee(emp).subscribe((data)=>{
      console.log("success data"+data);
    },(err)=>{
      debugger;
      console.log(JSON.stringify(err));
    });
    this.change(emp);
    this.delSuccessMsg="";
    this.successMsg = "Employee updated successfully!";
   }

}
