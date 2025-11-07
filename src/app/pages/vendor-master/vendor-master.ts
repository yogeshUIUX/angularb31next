import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Master } from '../../services/master';
import { INewVendor, NewVendor } from '../../model/vendor';
import { AlertBox } from "../../reusabeeComp/alert-box/alert-box";
import { Tabs } from "../../reusabeeComp/tabs/tabs";
import { ShowMoreShowLess } from "../../reusabeeComp/show-more-show-less/show-more-show-less";
import { MyButton } from "../../reusabeeComp/my-button/my-button";

@Component({
  selector: 'app-vendor-master',
  imports: [FormsModule, AlertBox, Tabs, ShowMoreShowLess, MyButton],
  templateUrl: './vendor-master.html',
  styleUrl: './vendor-master.css'
})
export class VendorMaster implements OnInit {

  // newVendorObj: any = {
  //   "vendorId": 0,
  //   "vendorName": "",
  //   "contactNo": "",
  //   "emailId": ""
  // };
  title = "Warning"

  newVendorObj: NewVendor = new NewVendor();

  vendorObj!: INewVendor;

  studentObj: any = {
    name: 'ABC',

    skills: ['Angular', 'Css', 'Html']
  }

  vendorList: NewVendor[] = [];
  http = inject(HttpClient);
  masterService = inject(Master);
  //vendorName: never = '';
  selectedTabName: string = 'Vendor List';

  ngOnInit(): void {
    this.getAllvendors();
    this.getAllClient()
  }

  getSelectedTabName(tabNAme: string) {
    debugger;
    this.selectedTabName = tabNAme;
  }

  getAllClient() {
    debugger;
    this.masterService.getAllClinet().subscribe({
      next: (res: any) => {
        debugger;
      }
    })
  }



  chnageName(form: NgForm) {
    debugger;
    form.form.controls['vendorName'].setValue("demo")
  }

  getAllvendors() {
    this.http.get("https://api.freeprojectapi.com/api/BusBooking/GetBusVendors").subscribe((Res: any) => {
      this.vendorList = Res;
    })
  }

  onSaveVendor() {
    debugger;
    // this.masterService.saveVendor(this.newVendorObj).subscribe((res:any)=>{

    // });
    this.http.post("https://api.freeprojectapi.com/api/BusBooking/PostBusVendor", this.newVendorObj).subscribe((res: any) => {
      debugger;
      alert("Vendor Created Success");
      this.getAllvendors();
    })
  }

  onEdit(data: any) {
    this.newVendorObj = data;
    this.selectedTabName = 'New Vendor Form'
  }

  onUpdateVendor() {
    this.http.put("https://api.freeprojectapi.com/api/BusBooking/PutBusVendors?id=" + this.newVendorObj.vendorId, this.newVendorObj).subscribe((res: any) => {
      alert("Vendor Updated");
      this.getAllvendors();
    })
  }

  onDeleteVendor(id: number) {
    const isDelete = confirm("Are you sure want to Delete");
    debugger;
    if (isDelete) {
      this.http.delete("https://api.freeprojectapi.com/api/BusBooking/DeleteBusVendor?id=" + id).subscribe((res: any) => {
        alert("Vendor Deleted");
        this.getAllvendors();
      })
    }
  }

  onResteForm() {
    this.newVendorObj = {
      "vendorId": 0,
      "vendorName": "",
      "contactNo": "",
      "emailId": ""
    };
  }
}
