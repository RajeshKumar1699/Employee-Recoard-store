import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder, Validators,FormControl} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef ,MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  ExperianceType=["Experiance","freshers"];

  employeeForm!:FormGroup;
  actionbtn: string="save"


  constructor(
    @Inject(MAT_DIALOG_DATA) public  editData: any,
    private formbuilder:FormBuilder ,
    private api:ApiService ,
    private dialogRef:MatDialogRef<DialogComponent>) { }
    

  ngOnInit(): void {
    this.employeeForm=this.formbuilder.group({
      employeeName:['',Validators.required],
      category:['',Validators.required],
      experiance:['',Validators.required ],
      date:['',Validators.required ],
      salary:['',Validators.required ],
      comment:['',Validators.required ],
    })



    if(this.editData){
      this.actionbtn="Update";
      this.employeeForm.controls['employeeName'].setValue(this.editData.employeeName);
      this.employeeForm.controls['category'].setValue(this.editData.category);
      this.employeeForm.controls['experiance'].setValue(this.editData.experiance);
      this.employeeForm.controls['date'].setValue(this.editData.date);
      this.employeeForm.controls['salary'].setValue(this.editData.salary);
      this.employeeForm.controls['comment'].setValue(this.editData.comment);
     
    }
  }


  addEmployee(){
    if(!this.editData){
      if(this.employeeForm.valid){
        this.api.postEmployee(this.employeeForm.value)
        .subscribe({
          next:(res)=>{
            alert("Employee Recoard addeed sucessfully")
            this.employeeForm.reset();
            this.dialogRef.close('save');
  
          },
          error:()=>{
            alert("error while adding employee data")
          }
        })
      }
    }else{
      this.updateEmployee()
    }

  }
  updateEmployee(){
    this.api.putEmployee(this.employeeForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("update sucessafully");
        this.employeeForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("error while updating Recoard !!");
      }
      
    })
  }
}
