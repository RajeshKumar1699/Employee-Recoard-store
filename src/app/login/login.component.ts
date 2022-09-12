import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup
   name!:string;
 

  constructor(private formBuilder:FormBuilder, private http:HttpClient, private router:Router ,public shared:ApiService) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      email:[''],
      password:[''],
    })

  }

/* login method defined*/
login(){
this.http.get<any>("http://localhost:3000/signup").subscribe(res=>{
  

  const user = res.find((a:any)=>{
    var msg=a.email;
     this.shared.setMessage(msg);

    var inout="logout";
     this.shared.setInOut(inout);

    return a.email ===this.loginForm.value.email && a.password === this.loginForm.value.password

  })
  if(user){
    alert("login is sucessful");
    this.loginForm.reset();
    this.router.navigate(['empdata']);
    
    
  }
  else{
    alert("user not found");
  }
    
},err=>{
  alert("Something error on server side");
}
)
}

}