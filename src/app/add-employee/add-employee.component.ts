import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../employee';
import { UserService } from '../service/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit {

  //employee: Employee = new Employee(0,"","",0);
  successMsg: any;
  errorMsg: any;

  addForm: FormGroup;
  submitted = false;

  constructor(
    private service:EmployeeService,
    public userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      empName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      //email: ['', [Validators.required, Validators.email]],
      salary: ['', [Validators.required, Validators.pattern('^\\d*$')]]
  });
  }

  // convenience getter for easy access to form fields
  get e() { return this.addForm.controls; }

  onSubmit() {
      
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addForm.value))
  }

  addEmployee() {

    this.submitted = true;

      // stop here if form is invalid
      if (this.addForm.invalid) {
          return;
      }
      else {
        this.service.addEmployee(this.addForm.value).subscribe((data)=>{
          console.log("success data"+data);
          this.errorMsg = "";
          this.successMsg = "Employee added successfully!";
        },(err)=>{
          //debugger;
          console.log(JSON.stringify(err));
          this.successMsg = "";
          this.errorMsg = "There is some error in adding new Employee!";
        });
      }
   
  }

  

}
