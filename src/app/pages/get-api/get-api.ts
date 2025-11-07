import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-get-api',
  imports: [FormsModule],
  templateUrl: './get-api.html',
  styleUrl: './get-api.css'
})
export class GetAPI implements OnInit {

  deptList: any[] = [];
  designationList: any[] = [];
  empList: any[] = [];
  selectedDeptId: number = 0;

  http = inject(HttpClient);

  constructor() {

  }

  ngOnInit(): void {
    this.getAllEmployee()
  }



  getAllDepratments() {
    debugger;
    // this.http.get("https://api.freeprojectapi.com/api/EmployeeApp/GetDepartments").subscribe((result:any)=>{
    //    debugger;
    //   this.deptList = result;
    // })
    this.http.get("https://api.freeprojectapi.com/api/EmployeeApp/GetDepartments").subscribe((result: any) => {
      this.deptList = result;
    })
  }

  getDesignationByDeptId() {
    this.http.get("https://api.freeprojectapi.com/api/EmployeeApp/GetDesignationsByDeptId?deptId=" + this.selectedDeptId).subscribe((result: any) => {
      this.designationList = result;
    })
  }
  getAllEmployee() {
    this.http.get("https://api.freeprojectapi.com/api/EmployeeApp/GetEmployees").subscribe((res: any) => {
      this.empList = res;
    })
  }


}
