import { Component, OnInit } from '@angular/core';
import CustomStore from "devextreme/data/custom_store";
import { CoreService } from '../utility/core.service';
import { CustomDataSourceService } from '../utility/custom-data-source.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employeeDataSource: CustomStore = new CustomStore();
  countriesDataSource: any;
  constructor(private core: CoreService,
    private source: CustomDataSourceService) {

  }
  ngOnInit(): void {
   
    this.countriesDataSource = this.source
      .load('Country', { requireTotalCount: true})
      .setKey('code')
      .build();
      
    this.employeeDataSource = this.source
      .load('Employee', { requireTotalCount: true})
      .insert('Employee')
      .updateFullModel('Employee', 'id')
      .remove('Employee')
      .setKey('id')
      .build();
  }

  onRowUpdating = (e: any) => {
    var assign = (<any>Object).assign({}, e.oldData, e.newData);
    e.newData = assign;
  }
}
