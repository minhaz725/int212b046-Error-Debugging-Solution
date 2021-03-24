import { EmployeeDetailsComponent } from './../employee-details/employee-details.component';
import { Observable } from "rxjs";
import { EmployeeService } from "./../employee.service";
import { Employee } from "./../employee";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  employees: Observable<Employee[]>;
  // err: 'Oh no!! No list shown here. Try to show the data. Don\'t think so complex, Think easier';
  err = '';
  constructor(private employeeService: EmployeeService,
              private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.employeeService.getEmployeesList().subscribe(
      data => {
        console.log(data.length);
        this.employees = data;
        console.log(this.employees);
        if (data.length > 0 ) {
          this.err = 'There are returned data from service but not displayed here. Solve the error to unlock next problem.';
        } else {
          this.err = 'No data in database. Please insert data first';
        }
      }
    );
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  employeeDetails(id: number) {
    this.router.navigate(['details', id]);
  }

  updateEmployee(id: number) {
    this.router.navigate(['update', id]);
  }
  // errorMsg(error) {
  //   console.log(error);
  //   this.errStutas = true;
  //   this.err = error.message;
  // }
  isEmpty(employees): boolean {
    console.log(employees.length);
    if ( employees.length === 0) {
      return true;
    }
    return false;
  }
}
