import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
  FormGroupName,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;

  //  signUpForm=new FormGroup({
  //   email:new FormControl('',Validators.required),
  // password:new FormConrol('')
  // })
  // get email(){return this.loginform.get('')}
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      fname: [''],
      lname: [''],
      email: [''],
      password: [''],
    });
  }

  //make method  to sugnup user
  signUp() {
    this.http
      .post<any>('http://localhost:3000/signup', this.signUpForm.value)
      .subscribe(
        (res) => {
          alert('Registration sucessfulle');
          this.signUpForm.reset();
          this.router.navigate(['login']);
        },
        (err) => {
          alert('something wrong');
        }
      );
  }
}
