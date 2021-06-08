import { HttpErrorResponse } from '@angular/common/http';
import { BuiltinTypeName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/Employee'
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'employeeManager';
  public employees?: Employee[];
  editEmployee?: Employee;
  defaultIcon: string = "https://bootdey.com/img/Content/avatar/avatar6.png"
  deleteEmployee?: Employee;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees()
  }

  public getEmployees(): void {
    document.getElementById("addModalClose")?.click()
    document.getElementById("editModalClose")?.click()
    document.getElementById("deleteModalClose")?.click()
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        console.log(error.message)
      }
    );
  }

  public onOpenModal(mode: string, emp?: Employee): void {
    const container_btn = document.getElementById('btn-holder')
    const button = document.createElement('button')
    button.type = "button"
    button.style.display = "none"
    button.setAttribute("data-toggle", "modal")
    if (mode === "add") {
      button.setAttribute("data-target", "#addEmployeeModal")
    }
    else if (mode === "edit") {
      this.editEmployee = emp
      button.setAttribute("data-target", "#editEmployeeModal")
    }
    else if (mode === "delete") {
      this.deleteEmployee = emp
      button.setAttribute("data-target", "#deleteEmployeeModal")
    }

    container_btn?.appendChild(button)
    button.click();

  }

  public onAddEmployee(addForm: NgForm): void {
    this.employeeService.addEmployee(addForm.value).subscribe((response: Employee) => { this.getEmployees(); addForm.reset(); }, (error: HttpErrorResponse) => { alert(error); addForm.reset(); });
  }

  public onEditEmployee(editForm: NgForm): void {
    console.log(editForm.value)
    this.employeeService.updateEmployee(editForm.value).subscribe((response: Employee) => { this.getEmployees(); editForm.reset(); }, (error: HttpErrorResponse) => { alert(error); editForm.reset(); });
  }

  public onDeleteEmployee(emp?: Employee): void {
    if (typeof (emp) !== "undefined") {
      this.employeeService.deleteEmployee(emp.id).subscribe((response: void) => { this.getEmployees(); this.deleteEmployee = undefined; }, (error: HttpErrorResponse) => { alert(error); this.deleteEmployee = undefined; });
    }
  }

  public searchEmployees(key: string): void {
    const results: Employee[] = [];

    if (this.employees !== undefined) {
      for (const emp of this.employees) {
        if (emp.name !== undefined) {
          if (emp.name.toLowerCase().indexOf(key) !== -1
            || emp.email.toLowerCase().indexOf(key) !== -1) {
            results.push(emp)
          }

        }
      }
    }
    this.employees = results

    if (results.length === 0 || !key) {
      this.getEmployees()
    }

  }
}


