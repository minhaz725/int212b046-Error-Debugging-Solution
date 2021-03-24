import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  submitted = false;
  errStutas = false;
  err = '';
  constructor(private employeeService: EmployeeService,
              private router: Router) { }

  ngOnInit() {
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  save() {
    // @ts-ignore
    this.employeeService.getEmployee((this.employee.id))
      .subscribe(data => {
        this.employee = new Employee();
        this.errStutas = false;
        this.gotoList();
        }, error =>
        this.errorMsg(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }
  errorMsg(error) {
    console.log(error);
    this.errStutas = true;
    this.err = error.message;
  }
}
