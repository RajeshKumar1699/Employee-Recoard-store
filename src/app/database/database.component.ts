import { AfterViewInit, Component, ViewChild, OnInit, Input } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';

// import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RouterLinkWithHref } from '@angular/router';




@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {
  displayedColumns: string[] = ['employeeName', 'category', 'date', 'experiance','salary','comment','action'];
  dataSource!: MatTableDataSource<any>;
  @Input() name!:String;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,private api:ApiService ,public shared:ApiService) { }
  message!:String 
  // message: string="rajesh"
  ngOnInit(): void {
    this.getAllEmployee();
    this.message= this.shared.getMessage()
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
     width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val=='save'){
         this.getAllEmployee();
      }
    })
  }

getAllEmployee(){
this.api.getEmployee()
.subscribe({
  next:(res)=>{
    
    this.dataSource=new MatTableDataSource(res);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  },
  error:(res)=>{
    alert("Error while fetching Employee Recoard")
  }
})
}

editEmployee(row : any){
this.dialog.open(DialogComponent,{
  width:'35%',
  data:row
}).afterClosed().subscribe(val=>{
  if(val=='update'){
    this.getAllEmployee();
  }
})
}

deleteEmployee(id:number){
this.api.deleteEmployee(id)
.subscribe({
  next:(res)=>{
    alert("Employee deleted sucessfully")
    this.getAllEmployee();

  },
  error:()=>{
    alert("Error while deleting the Recoard");
  }
})
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}
