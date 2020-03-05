export class Employee
{
    public empId:number;
    public empName:string;
    public emailId:string;
    public salary:number;
    public isEdit:boolean=false;
    public inEdit:boolean=false;
    
    constructor(
        empId:number,
        empName:string,
        emailId:string,
        salary:number
    ) {
        this.empId=empId;
        this.empName=empName;
        this.salary=salary;
        this.emailId=emailId;
    }

}
