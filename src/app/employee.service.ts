import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from 'src/app/Employee'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServiceUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServiceUrl}employee/all`);
  }

  public addEmployee(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServiceUrl}employee/add`, emp);
  }

  public updateEmployee(emp: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServiceUrl}employee/update`, emp);
  }

  public deleteEmployee(empId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServiceUrl}employee/delete/${empId}`);
  }


}
